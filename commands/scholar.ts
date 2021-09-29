import { Message } from "discord.js";
import { ICommand } from "wokcommands";

export default {
    category: 'scholar',
    description: 'use the other command',

    slash: true,
    testOnly: true,
    

    callback: ({interaction}) => {
        interaction.reply({
            content: 'Please use the other command',
            ephemeral: true
        })
    }
} as ICommand;