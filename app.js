const Mixer = require('beam-client-node');
const ws = require('ws');

let userInfo;

const client = new Mixer.Client(new Mixer.DefaultRequestRunner());

// With OAuth we don't need to log in. The OAuth Provider will attach
// the required information to all of our requests after this call.
client.use(new Mixer.OAuthProvider(client, {
    tokens: {
        access: 'GET ACCESS CODE FROM MIXER.COM',
        expires: Date.now() + (365 * 24 * 60 * 60 * 1000)
    },
}));

// Gets the user that the Access Token we provided above belongs to.
client.request('GET', `users/current`)
.then(response => {
    userInfo = response.body;
    return new Mixer.ChatService(client).join(response.body.channel.id);
})
.then(response => {
    const body = response.body;
    return createChatSocket(userInfo.id, userInfo.channel.id, body.endpoints, body.authkey);
})
.catch(error => {
    console.error('Something went wrong.');
    console.error(error);
});

/**
 * Creates a Mixer chat socket and sets up listeners to various chat events.
 * @param {number} userId The user to authenticate as
 * @param {number} channelId The channel id to join
 * @param {string[]} endpoints An array of endpoints to connect to
 * @param {string} authkey An authentication key to connect with
 * @returns {Promise.<>}
 */
function createChatSocket (userId, channelId, endpoints, authkey) {
    // Chat connection
    const socket = new Mixer.Socket(ws, endpoints).boot();

	////// This section is for the greeting //////
	
    // Greet a joined user
    socket.on('UserJoin', data => {
        socket.call('msg', [`Welcome to ReesesSnickers stream ${data.username}! I'm ReeseSBot! I will answer common questions for ReesesSnickers! I\'m in development so please bare with ReeseSBot.`]);
		console.log ('${data.username} viewed the stream');
	});

	
	
	////// This section is for common questions //////
	
    // React to our reesesbot help command
    socket.on('ChatMessage', data => {
        if (data.message.message[0].data.toLowerCase().startsWith('reesesbot help')) {
            socket.call('msg', [`@${data.user_name} I have a multitude of commands. Feel free to check them out as you like. COMMANDS: future development. apologies for any inconvenience.`]);
            console.log(`helped ${data.user_name}`);
        }
    });
	
	// React to our what is 1acc command
    socket.on('ChatMessage', data => {
        if (data.message.message[0].data.toLowerCase().startsWith('what is 1acc')) {
            socket.call('msg', [`@${data.user_name} 1ACC is ReesesSnickers Battlefield 1 platoon. 1ACC stands for 1st Air Corp Command. ReesesSnickers is always looking for new troops to game with. Hit up the platoon if you like! dont forget to subscribe!`]);
            console.log(`Answered "what is 1acc" for ${data.user_name}`);
        }
    });
	
	socket.on('ChatMessage', data => {
        if (data.message.message[0].data.toLowerCase().startsWith('what\'s 1acc')) {
            socket.call('msg', [`@${data.user_name} 1ACC is ReesesSnickers Battlefield 1 platoon. 1ACC stands for 1st Air Corp Command. ReesesSnickers is always looking for new troops to game with. Hit up the platoon if you like! dont forget to subscribe!`]);
            console.log(`Answered "what\'s 1acc" for ${data.user_name}`);
        }
    });
	
	socket.on('ChatMessage', data => {
        if (data.message.message[0].data.toLowerCase().startsWith('what does 1acc stand for')) {
            socket.call('msg', [`@${data.user_name} 1ACC is ReesesSnickers Battlefield 1 platoon. 1ACC stands for 1st Air Corp Command. ReesesSnickers is always looking for new troops to game with. Hit up the platoon if you like! dont forget to subscribe!`]);
            console.log(`Answered "what does 1acc stand for" for ${data.user_name}`);
        }
    });
	
	// React to our who is reesesbot command
    socket.on('ChatMessage', data => {
        if (data.message.message[0].data.toLowerCase().startsWith('who is reesesbot')) {
            socket.call('msg', [`@${data.user_name} ReeseSBot is not sure exactly. ReesesSnickers programmed me to assist his viewers but im limited to what I can do at his time. I assume I am a like a sadly programmed version of Iron Mans J.A.R.V.I.S.`]);
            console.log(`Answered "who is reesesbot" for ${data.user_name}`);
        }
    });
	
	socket.on('ChatMessage', data => {
        if (data.message.message[0].data.toLowerCase().startsWith('who are you reesesbot')) {
            socket.call('msg', [`@${data.user_name} ReeseSBot is not sure exactly. ReesesSnickers programmed me to assist his viewers but im limited to what I can do at his time. I assume I am a like a sadly programmed version of Iron Mans J.A.R.V.I.S.`]);
            console.log(`Answered "who are you reesesbot" for ${data.user_name}`);
        }
    });
	
	// React to our what is reesesbot command
    socket.on('ChatMessage', data => {
        if (data.message.message[0].data.toLowerCase().startsWith('what is reesesbot')) {
            socket.call('msg', [`@${data.user_name} ReeseSBot is not sure exactly. ReesesSnickers programmed me to assist his viewers. I assume I am a virtual secretery`]);
            console.log(`Answered "what is reesesbot" for ${data.user_name}`);
        }
    });
	
	socket.on('ChatMessage', data => {
        if (data.message.message[0].data.toLowerCase().startsWith('what are you reesesbot')) {
            socket.call('msg', [`@${data.user_name} ReeseSBot is not sure exactly. ReesesSnickers programmed me to assist his viewers. I assume I am a virtual secretery`]);
            console.log(`Answered "what are you reesesbot" for ${data.user_name}`);
        }
    });
	
	// React to our what game is this command
    socket.on('ChatMessage', data => {
        if (data.message.message[0].data.toLowerCase().startsWith('what game is this')) {
            socket.call('msg', [`@${data.user_name} The current game being streamed is Battlefield 1. If you are enjoying the stream, don't forget to subscrbe.`]);
            console.log(`Answered "what game is this" for ${data.user_name} `);
        }
    });
	
	socket.on('ChatMessage', data => {
        if (data.message.message[0].data.toLowerCase().startsWith('what game is being streamed')) {
            socket.call('msg', [`@${data.user_name} The current game being streamed is Battlefield 1. If you are enjoying the stream, don't forget to subscrbe.`]);
            console.log(`Answered "what game is being streamed" for ${data.user_name} `);
        }
    });
	
	socket.on('ChatMessage', data => {
        if (data.message.message[0].data.toLowerCase().startsWith('what is being streamed')) {
            socket.call('msg', [`@${data.user_name} The current game being streamed is Battlefield 1. If you are enjoying the stream, don't forget to subscrbe.`]);
            console.log(`Answered "what is being streamed" for ${data.user_name} `);
        }
    });
	
	
	
	//////// this section is for random chat commands ////////
	
	// React to our reesesbot sucks command
    socket.on('ChatMessage', data => {
        if (data.message.message[0].data.toLowerCase().startsWith('reesesbot sucks')) {
            socket.call('msg', [`ReeseSBot doesn't suck. ReesesSnickers sucks! He needs to stop catching bullets and start throwing them.`]);
            console.log(`Changed fire to ReesesSnickers for ${data.user_name}`);
        }
    });
	
	// React to our easter egg command
    socket.on('ChatMessage', data => {
        if (data.message.message[0].data.toLowerCase().startsWith('easter egg')) {
            socket.call('msg', [`ReeseSBot LOVES EASTER EGGGGGGGGGs!!!!!!`]);
            console.log(`${data.user_name} found the easter egg!`);
        }
    });
	
	// React to our beep beep command
    socket.on('ChatMessage', data => {
        if (data.message.message[0].data.toLowerCase().startsWith('beep beep')) {
            socket.call('msg', [`ReeseSBot thinks the sidewalk isn\'t a road ReesesSnickers. oh... now I see what you are.. doing... do you need me to order a detail job?`]);
            console.log(`${data.user_name} said Beep Beep!`);
        }
    });
	
	

	
	
	////// This section is for console logs for admin //////
	
    // Handle errors
    socket.on('error', error => {
        console.error('Socket error');
        console.error(error);
    });

    return socket.auth(channelId, userId, authkey)
    .then(() => {
        console.log('Login successful');
        return socket.call('msg', ['Hi! I\'m ReeseSBot! I will be your viwer\'s assistant for today. Feel free to chat in at any time! I\'m in development so bare with ReeseSBot.']);
    });
}