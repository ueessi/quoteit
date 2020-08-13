const wa = require("@open-wa/wa-automate");
const fetch = require("node-fetch");

wa.create().then((client) => start(client));

//Boleh Di Grup? Jika Tidak Isi False, Jika Iya Isi True
let grup = true;
//----------------

//Commandnya Bisa Edit Sesukamu
let command = "#quoteit";
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
  let data = message.body.slice(9);
  let kata;
  let author;
  let tipe;
  if (data.match(/\|/g)) {
    if (data.match(/\|/g).length == 2) {
      kata = data.split("|")[0].trim();
      author = data.split("|")[1].trim();
      tipe = data.split("|")[2].trim();
    } else if (data.match(/\|/g).length == 1) {
      kata = data.split("|")[0].trim();
      author = data.split("|")[1].trim();
      tipe = "random";
    }
  } else {
    kata = data.trim();
    author = "01am.trought";
    tipe = "random";
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
