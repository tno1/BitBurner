let config = {
  folder: 'scripts',
  rootUrl: 'https://raw.githubusercontent.com/tno1/bitburner/main/',
  serverPrefix: 'TnoPrefix',
};
/*
 * This will import all files listed in importFiles.
 */
export async function main(ns) {
  let filesImported = await importFiles(ns);
  ns.tprint('='.repeat(20));
  if (filesImported) {
    ns.tprint(`You've installed the in the ${config.folder} directory.`);
    ns.tprint(
      `A good place to start is running \`run /${config.folder}/import.js\``
    );
	ns.run(config.folder + "/import.js",1);
  } else {
    ns.tprint(
      'You had some issues downloading files, please reach out to the repo maintainer or check your config.'
    );
  }
}

async function importFiles(ns) {
  let files = [
    'import.js',
  ];
  let filesImported = true;
  for (let file of files) {
    let remoteFileName = `${config.rootUrl}scripts/${file}`;
    let result = await ns.wget(remoteFileName, `/${getFolder()}/${file}`);
    filesImported = filesImported && result;
    ns.tprint(`File: ${file}: ${result ? '✔️' : '❌'}`);
  }
  return filesImported;
}
