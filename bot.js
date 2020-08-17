const Discord= require('discord.js');

const {prefix,token}=require('./config.json');

const client=new Discord.Client();
const quiz= require('./quiz.json');



client.once('ready',()=>{
	console.log('Bot is now connected');
	//client.channels.find(x=>x.name==='general').send('Hello Master! I will work for you.');
	
});



const exampleEmbed = {
	color: 0x0099ff,
	title: 'Marxist Bot',
	url: 'https://marxistleninist.github.io',
	author: {
		name: 'Help',
		icon_url: 'https://i.imgur.com/hNIVvJ3.jpg',
		url: 'https://github.com/marxistleninist/Marxist-Bot',
	},
	description: 'This bot will help you learn Communist Theory and Communist History in a fun way.',
	thumbnail: {
		url: 'https://i.imgur.com/VwpFNkw.jpg',
	},
	fields: [
		{
			name: 'Commands',
			value: '\u200b',
			inline: true,
		},
		{
			name: '!quiz',
			value: 'This command will ask you questions.',
			inline: true,
		},
	],
	image: {
		url: 'https://i.imgur.com/T9fUcCQ.jpeg',
	},
	timestamp: new Date(),
	footer: {
		text: 'Bot started ',
		icon_url: 'https://i.imgur.com/T9fUcCQ.jpeg',
	},
};

const ques = {
	color: 0x0099ff,
	fields: [
		{
			name: 'Question',
			value: '',
			inline: true,
		}
	],

	footer: {
		text: 'Category: CPI History'
	},
};



client.on('message',message=>{
	if((message.content===('f') || message.content===('F')) && !message.author.bot)
		message.channel.send();

	if(message.content.startsWith(prefix+'quiz')){

			const item = quiz[Math.floor(Math.random() * quiz.length)];
			console.log(item["options"][0]);
			let options="A) "+item["options"][0]+'\n'+"B) "+item["options"][1]+'\n'+"C) "+item["options"][2]+'\n'+"D) "+item["options"][3];
				const filter = m => m.author.id===message.author.id;
				//const collector = message.channel.createMessageCollector(filter, { time: 15000, max: 1, maxMatches: 1 });

				ques.fields[0].value= item.question+"\n"+options;
				message.channel.send({ embed: ques }).then(() => {
					message.channel.awaitMessages(filter, { max: 1, time: 10000, errors: ['time'] })
							.then(collected => {
								if(collected.first().content.toLowerCase()===item.answer)
						message.channel.send('You got the correct answer!');
					else message.channel.send('Wrong answer!!!');
				})
				.catch(collected => {
				message.channel.send('Time\'s up!!!');
			});
		});











				// collector.on('collect', m => {
					
				// 	if(m.content===item.answer)message.channel.send('Kya baat! Sab jante hai aap!');
				// 	else message.channel.send('Padh ke aao bey');
					
				// });

				// collector.on('end', collected => {
				// 	message.channel.send('Times up! You are too fast man!');
				// });
	}
	if(message.content.startsWith(prefix+'help')){
		message.channel.send({ embed: exampleEmbed });

	}
	else if(message.content.startsWith(prefix+'info')){
		message.channel.send('Id was created '+message.author.createdAt+
			'\nYour last msg '+message.author.lastMessage);
	}

});

client.login(token);


