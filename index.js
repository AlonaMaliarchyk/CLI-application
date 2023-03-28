const fs = require("fs/promises");
const { program  } = require("commander");
const yargs = require("yargs"); 
const {hideBin} = require (("yargs/helpers"));
const contacts = require("./contacts");

const invokeAction = async({ action, id, name, email, phone })=> {
    switch(action){
        case "list":
            const allContacts = await contacts.listContacts();
            return console.table(allContacts);
        case "get":
            const oneContact = await contacts.getById(id);
            return console.table(oneContact);  
        case "addContact":
            const newContact = await contacts.addContact({name, email, phone});
            return console.table(newContact);    
        case "updatebyId":
            const updateContact = await contacts.updatebyId(id, {name, email, phone });
            return console.table(updateContact);
        case "deletebyId":
            const deletebyId = await contacts.deletebyId(id);
            return console.table(deletebyId);
     }
}

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");
  
program.parse(process.argv);
const options = program.opts();

invokeAction(options);