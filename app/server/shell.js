const config = require('./utils/config');
const colors = require('colors');
const shell = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
  completer(line){
    const completions = Command.Aliases;
    const hits = completions.filter(completion => completion.indexOf(line) == 0);
    return [hits&&hits.length>0 ? hits : completions, line];
  }
});
const prompt1 = 'sh> '.green;
const prompt2 = '  * '.red;
const prompt3 = '  - '.grey;

function execute(line){
  const [cmd, ...args] = line.split(/('.*?'|".*?"|\S+)/g).filter(s=>s.trim()).map(s=>s.replace(/"(.*)"/g,"$1"));
  for(const command of Command.List)
    if(command.is(cmd)) return command.execute(args);
}

function start(){
  const message = `| ${config.ssl ? 'HTTPS' : 'HTTP'} server running on port ${config.port} |`;
  const border = `+${'-'.repeat(message.length-2)}+`;
  console.log(`${border}\n${message}\n${border}`.cyan);
  shell.setPrompt(prompt1);
  shell.prompt();
  shell.on('line', (line) => {
    execute(line);
    shell.prompt();
  });
}

function Command({aliases, help, execute = ()=>undefined}){
  if(typeof aliases === 'string') aliases = [aliases];
  aliases = aliases.map(alias => alias.toLowerCase());
  this.aliases = aliases;
  this.help = help;
  this.execute = execute.bind(this);
  this.is = (cmd) => aliases.includes(cmd.toLowerCase());
  this.prompt = (message, args) => {
    shell.question(message, (answer) => {
      if(Command.YES.is(answer)) this.execute(args);
    });
  };
  Command.List.push(this);
  Command.Aliases = Command.Aliases.concat(aliases);
}
Command.List = [];
Command.Aliases = [];
Command.print = (message) => console.log(`${prompt2}${message}`);
Command.prompt = (message, exec) => {
  return (args) => {
    shell.question(`${prompt2}${message} (y/n): `, (answer) => {
      if(Command.Yes.is(answer)) exec(args);
      shell.write('\n');
    });
  };
};

Command.Yes = new Command({aliases: ['yes', 'y']});
Command.No = new Command({aliases: ['no', 'n']});
Command.Exit = new Command({
  aliases: ['exit','quit','kill'],
  help: 'Kill the server',
  execute: Command.prompt('Are you sure?', (args) => {
    process.exit(0);
  })
});
Command.Help = new Command({
  aliases: ['help'],
  execute: (args) => {
    Command.List
    .sort((a,b) => {
      const _a = a.aliases[0], _b = b.aliases[0];
      if(_a < _b) return -1;
      else if(_a > _b) return 1;
      return 0;
    })
    .filter(command => command.help)
    .forEach((command,index) => {
      const [primary, ...aliases] = command.aliases;
      Command.print(`${primary} ${aliases.join('/').grey}: ${command.help.italic}`);
    });
  }
});
Command.Config = new Command({
  aliases: ['config', 'info'],
  help: 'Get configuration settings',
  execute: ([key, ...rest]) => Command.print(config[key])
});
Command.Eval = new Command({
  aliases: ['eval'],
  help: 'Evaluate expression '+'(dangerous!)'.red,
  execute: ([expr,...rest]) => {
    try {
      Command.print(eval(expr));
    } catch (e) {
      Command.print(e);
    }
  }
});

module.exports = {start};
