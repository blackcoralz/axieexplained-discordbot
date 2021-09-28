import { MessageEmbed } from "discord.js";
import { ICommand } from "wokcommands";
import scholar from "../document/scholar.json";
import axios from 'axios';

export default {
    category: 'scholarinfo',
    description: 'Replies with your AxieExplained Scholarship Account Info',

    slash: 'both',
    testOnly: true,

    callback: ({interaction: message}) => {
        const target = message.user;
        var is_found = false;
        var scholaruser;
        for(var i = 0; i < scholar.length; i++){
            var obj = scholar[i];
            var scholar_id = obj["user_id"];
            if(target.id === scholar_id){
                is_found = true;
                scholaruser = obj;
                break;
            }
        }
        if(scholaruser){
        if(is_found){
            let memberronin = scholaruser["ronin_address"]
            axios.get(`https://game-api.axie.technology/api/v1/${memberronin}`)
                .then(jsondata => {
                        const lastupdate = jsondata.data.cache_last_updated;
                        const ingameslp = jsondata.data.in_game_slp;
                        const lifetimeslp = jsondata.data.lifetime_slp;
                        const name = jsondata.data.name;
                        const mmr = jsondata.data.mmr;
                        const rank = jsondata.data.rank;
                        const embed = new MessageEmbed()
                        .setTitle('Axie Explained Scholarship Account')
                        .setColor("BLUE")
                        .setAuthor(JSON.stringify(name))
                        .addField('MMR', JSON.stringify(mmr), true)
                        .addField('Rank', JSON.stringify(rank), true)
                        .addField('In Game SLP', JSON.stringify(ingameslp), true)
                        .addField('Life Times SLP', JSON.stringify(lifetimeslp), true)
                        .setTimestamp(lastupdate);
                        message.reply({
                        embeds: [embed]
                        })
                });
        } else {
            message.reply({
                content: 'Sorry your account is not listed yet, please try again later!'
            })
        }
    }else {
        message.reply({
            content: 'Sorry your account is not listed yet, please try again later!'
        })
    }

    },
} as ICommand