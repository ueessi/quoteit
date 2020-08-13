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
  let tipe;
  let cekTipe = message.body.split("|");
  if (cekAuthor && cekTipe.length == 3) {
    kata = message.body.slice(9).split("|")[0];
    author = message.body.split("|")[1];
    tipe = message.body.split("|")[2];
  } else if (cekAuthor) {
    kata = message.body.slice(9).split("|")[0];
    author = message.body.split("|")[1];
    tipe = "random";
  } else {
    kata = message.body.slice(9);
    tipe = "random";
    author = "01am.trought";
  }
  quoteIT(kata, author, tipe, client, message);
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
