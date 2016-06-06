
function doGet(e) {
  return HtmlService.createHtmlOutputFromFile('index.html');
}

function uploadFiles(form) {

  try {

    var dropbox = "File Uploads for issues.clearscienceinc.com";
    var folder, folders = DriveApp.getFoldersByName(dropbox);

    if (folders.hasNext()) {
      folder = folders.next();
    } else {
      folder = DriveApp.createFolder(dropbox);
    }

    var blob = form.myFile;
    var file = folder.createFile(blob);
    file.setDescription("Uploaded by " + form.myName);

    return "File uploaded successfully " + file.getUrl();

  } catch (error) {

    return error.toString();
  }

}
