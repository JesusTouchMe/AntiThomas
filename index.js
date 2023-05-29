const TOKEN = process.env["DISCORD_TOKEN"];
const { Client, Events, GatewayIntentBits } = require("discord.js");

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates] });
const run = require("./server.js"); // for keeping alive

function delay(time) {
	return new Promise(resolve => setTimeout(resolve, time));
}

client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.on(Events.VoiceStateUpdate, async (before, after) => {
	if (after.channel) {
		if (after.channel.members.size == 1) {
			console.log("detected member joining vc alone");
			
			let member = after.channel.members.first();
			if (member.id != "747090576507273218") return;
			await delay(10000);
			
			if (after.channel.members.size == 1) {
				await after.disconnect();
				await member.send("you are alone in vc :skull:");
			}
		}
	} else if (before.channel) {
		if (before.channel.members.size == 1) {
			console.log("detected member joining vc alone");
			
			let member = before.channel.members.first();
			if (member.id != "747090576507273218") return;
			await delay(10000);
			
			if (before.channel.members.size == 1) {
				await before.disconnect();
				await member.send("you are alone in vc :skull:");
			}
		}
	}
});

client.login(TOKEN);
run();