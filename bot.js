//discord.js is mandatory, config.json has the prefix and token in it, add your own config file in the form of a JSON object.
// quiz.json and tflist.json are files that have the questions and statements

const Discord= require('discord.js');
const {prefix,token}=require('./config.json');
const quiz= require('./quiz.json'); 
const tflist=require('./tflist.json');


const client=new Discord.Client();



client.once('ready',()=>{
	console.log('Bot is now connected');
});


// This embed is used to show 'help' menu

const helpEmbed = {
	color: 0x0099ff,
	title: 'Marxist Bot',
	url: 'https://github.com/marxistleninist/Marxist-Bot',
	author: {
		name: 'Help',
		icon_url: 'https://i.imgur.com/hNIVvJ3.jpg',
		url: 'https://marxistleninist.github.io',
	},
	description: 'This bot will help you learn Communist Theory and Communist History in a fun way.',
	thumbnail: {
		url: 'https://i.imgur.com/T9fUcCQ.jpeg',
	},
	fields: [
		{
			name: 'Commands',
			value: '\u200b',
			inline: true,
		},
		{
			name: '!quiz',
			value: 'This command will ask you questions with four options.',
			inline: true,
		},
		{
			name: '!tf',
			value: 'This command will ask you true/false questions.',
			inline: true,
		},
	],
	
	timestamp: new Date(),
	footer: {
		text: 'Bot started ',
		icon_url: 'https://i.imgur.com/T9fUcCQ.jpeg',
	},
};

// This embed is used for questions,title, description and footer text are updated according to the type of question
const question = {
	color: 0xff0000,
	title: '',
	thumbnail: {
		url: 'https://i.imgur.com/T9fUcCQ.jpeg',
	},
	description:"",

	footer: {
		text: ''
	},
};


client.on('message',message=>{
	
	// If the user writes '!quiz then this block runs
	if(message.content.startsWith(prefix+'quiz')){
		
			//select a random question from the array
			const item = quiz[Math.floor(Math.random() * quiz.length)];
			
			// prepare the list of options
			let options="A) "+item["options"][0]+'\n'+"B) "+item["options"][1]+'\n'+"C) "+item["options"][2]+'\n'+"D) "+item["options"][3];
				
				// This filter is applied so that the person sending first and second message can be identified.
				const filter = m => m.author.id===message.author.id;
				
				question.title="Question";
				question.description=item.question+"\n"+options;
				question.footer.text="Category: "+item.category;
				
				//here we send the embed and wait for the reply from the user
				message.channel.send({ embed: question }).then(() => {
					message.channel.awaitMessages(filter, { max: 1, time: 12000, errors: ['time'] })
							.then(collected => {
						//if the answer is correct then show message else show the correct answer		
						if(collected.first().content.toLowerCase()===item.answer)
							message.channel.send('You got the correct answer!');
						else message.channel.send('Wrong answer!!!'+ " The correct option is: ```"+item.answer.toUpperCase()+") "+item["options"][item.answer.toUpperCase().charCodeAt(0)-65]+"```");
				})
					// In case if the user doesnt reply within the time limit
				.catch(collected => {
				message.channel.send('Time\'s up!!!');
			});
		});

	}
	//same as above
	else if(message.content.startsWith(prefix+'tf')){
			
			const item = tflist[Math.floor(Math.random() * tflist.length)];
			
			
				const filter = m => m.author.id===message.author.id;
				
				question.title="True or False";
				question.description= item.statement;
				question.footer.text="Type t/f";

				message.channel.send({ embed: ques }).then(() => {
					message.channel.awaitMessages(filter, { max: 1, time: 12000, errors: ['time'] })
							.then(collected => {
								console.log(collected.first().content.toLowerCase());
								if(collected.first().content.toLowerCase()===item.answer)
						message.channel.send('You got the correct answer!');
					else message.channel.send('Wrong answer!!!');
				})
				.catch(collected => {
				message.channel.send('Time\'s up!!!');
			});
		});		
	}
	else if(message.content.startsWith(prefix+'help')){
		message.channel.send({ embed: exampleEmbed });

	}
	

});

client.login(token);


