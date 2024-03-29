import { Interaction, MessageEmbed } from "discord.js";
import { ICommand } from "wokcommands";
import scholar from "../document/scholar.json";
import axios from 'axios';

export default {
    category: 'scholarinfo',
    description: 'Replies with your AxieExplained Scholarship Account Info',

    slash: true,
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
            const newmemberronin = memberronin.replace('0x','ronin:')
            axios.get(`https://game-api.axie.technology/api/v1/${memberronin}`)
                .then(jsondata => {
                        const lastupdate = jsondata.data.cache_last_updated;
                        const ingameslp = new Intl.NumberFormat().format(jsondata.data.in_game_slp);
                        const lifetimeslp = new Intl.NumberFormat().format(jsondata.data.lifetime_slp);
                        const totalslp = new Intl.NumberFormat().format(jsondata.data.total_slp);
                        const name = jsondata.data.name;
                        const mmr = new Intl.NumberFormat().format(jsondata.data.mmr);
                        const rank = new Intl.NumberFormat().format(jsondata.data.rank);
                        const embed = new MessageEmbed()
                        .setTitle('Axie Explained Scholarship Account')
                        .setColor("BLUE")
                        .setAuthor(JSON.stringify(name))
                        .setDescription(`[My Axies](https://marketplace.axieinfinity.com/profile/${newmemberronin}/axie)`)
                        .addField('MMR', mmr, true)
                        .addField('Rank', rank, true)
                        .addField('In Game SLP', ingameslp, true)
                        .addField('SLP On Account', totalslp, true)
                        .addField('Claimed SLP', lifetimeslp, true)
                        .setTimestamp(lastupdate);
                        message.reply({
                        embeds: [embed]
                        })
                });
        } else {
            message.reply({
                content: `Sorry your account is not listed yet, please contact <@307165284966334467>, send your scholar ronin address on his DM and then try to call the interaction again, this process is 100% safe!`
            })
        }
    }else {
        message.reply({
            content: `Sorry your account is not listed yet, please contact <@307165284966334467>, send your scholar ronin address on his DM  and then try to call the interaction again, this process is 100% safe!`
        })
    }

    },
} as ICommand