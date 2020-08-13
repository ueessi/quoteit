const wa = require("@open-wa/wa-automate");
const fetch = require("node-fetch");

wa.create().then((client) => start(client));

//Boleh Di Grup? Jika Tidak Isi False, Jika Iya Isi True
let grup = true;
//----------------

//Commandnya Bisa Edit Sesukamu
let command = "/quoteit";
//----------------

//Function QuoteIT
const quoteIT = function (kata, author, tipe, c, m) {
  fetch(
    `https://terhambar.com/aw/qts/?kata=${kata}&author=${author}&tipe=${tipe}`
  )
    .then((res) => res.json())
    .then(async (res) => {
      await c.sendFileFromUrl(m.from, res.result);
    });
};

const Eksekusi = async function (client, message) {
  let cekAuthor = message.body.match(/\|/g);
  let kata;
  let author;
  if (cekAuthor) {
    kata = message.body.split(" ")[1].split("|")[0];
    author = message.body.split("|")[1];
  } else {
    kata = message.body.split(" ")[1];
    author = "01am.trought";
  }
  quoteIT(kata, author, `random`, client, message);
};
//--------------

function start(client) {
  client.onMessage(async (message) => {
    if (message.body.split(" ")[0] === command) {
      if (message.chat.isGroup) {
        if (grup) {
          Eksekusi(client, message);
        }
      } else {
        Eksekusi(client, message);
      }
    }
  });
}
