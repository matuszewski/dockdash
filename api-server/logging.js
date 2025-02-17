import colors from "colors";

// const getTimestamp = () => {
//    // getting current timestamp
//    return new Date().toISOString(); // ISO format: 2025-02-17T14:30:00.000Z
// }

const getTimestamp = () => {
   const now = new Date();
   const year = now.getFullYear();
   const month = String(now.getMonth() + 1).padStart(2, "0"); // Month is 0-based
   const day = String(now.getDate()).padStart(2, "0");
   const hours = String(now.getHours()).padStart(2, "0");
   const minutes = String(now.getMinutes()).padStart(2, "0");
   const seconds = String(now.getSeconds()).padStart(2, "0");
   const milliseconds = String(now.getMilliseconds())
      .padStart(3, "0")
      .slice(0, 3); // keep only n digits for milliseconds

   return `${year}.${month}.${day} ${hours}:${minutes}:${seconds}.${milliseconds}`;
};

const logging_name = "api-server";

const success = () => {
   return (
      `${getTimestamp()} ${logging_name} `.gray +
      "[".white +
      " SUCCESS ".green +
      "]".white +
      ":"
   );
};
const info = () => {
   return (
      `${getTimestamp()} ${logging_name} `.gray +
      "[".white +
      " INFO    ".blue +
      "]".white +
      ":"
   );
};
const failure = () => {
   return (
      `${getTimestamp()} ${logging_name} `.gray +
      "[".white +
      " ERROR   ".red +
      "]".white +
      ":"
   );
};
const debug = () => {
   return (
      `${getTimestamp()} ${logging_name} `.gray +
      "[".white +
      " DEBUG   ".yellow +
      "]".white +
      ":"
   );
};
const banner = String.raw`
    ||         ||       ||         ||
,---|,---.,---.|__/ ,---|,---.,---.|,--.
|[ ]||[ ]||[   | \\ |[ ]|,---|'---.|| ||
'---''---''---''   ''---''---^'---''' ''
`.blue.bold;

export default { success, info, failure, debug, banner };
