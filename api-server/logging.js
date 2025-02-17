import colors from "colors";

const logging_name = "api-server";

const success =
   `${logging_name} `.gray + "[".white + "SUCCESS".green + "]".white + ":";
const info =
   `${logging_name} `.gray + "[".white + " INFO ".blue + "]".white + ":";
const failure =
   `${logging_name} `.gray + "[".white + " ERROR ".red + "]".white + ":";
const debug =
   `${logging_name} `.gray + "[".white + " DEBUG ".yellow + "]".white + ":";


const banner = String.raw`
    ||         ||       ||         ||   
,---|,---.,---.|__/ ,---|,---.,---.|,--.
|[ ]||[ ]||[   | \\ |[ ]|,---|'---.|| ||
'---''---''---''   ''---''---^'---''' ''
`.blue.bold;


export default { success, info, failure, debug, banner};
