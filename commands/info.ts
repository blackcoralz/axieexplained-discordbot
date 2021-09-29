import { Interaction, MessageEmbed } from "discord.js";
import { ICommand } from "wokcommands";

export default {
    category: 'info',
    description: 'This bot description',

    slash: true,
    testOnly: true,

    callback: ({interaction}) => {
        if(interaction.user.id === '307165284966334467'){
            const embed = new MessageEmbed()
            .setTitle(`What's Lunar Knights Bot?`)
            .setDescription('**Lunar Knights Bot** is exclusive bot for Axie Explained Discord server, and\n**can only be used on this server ONLY!!**')
            .setColor('RED')
            .addField('Features :','please kindly use **/scholarinfo** for checking your scholar account information')
            .addField('Field on /scholarinfo', '**MMR** : show your current Matchmaking Rank\n**Rank** : your current position on the leaderboard\n**SLP** : SLP that currently on your account (in-game)\n**Life Times SLP** : All of your SLP since you start your journey\n\n**IMPORTANT NOTE!!**\nThe timestamp that show on the bottom of **/scholarinfo** embed, is the last time the data was retrieved by the API that the bot use. the data is **NOT 100% in real-time**.')
            .setFooter('This bot is developed by Coralz#9999')
            interaction.reply({
                embeds: [embed]
            })
        } else {
            interaction.reply({
                content: 'you cannot use this command',
                ephemeral: true,
            })
            
        }
    }
} as ICommand;