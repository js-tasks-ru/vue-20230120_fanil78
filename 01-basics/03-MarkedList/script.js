import { createApp } from "./vendor/vue.esm-browser.js";

const emails = [
  "Eliseo@gardner.biz",
  "Jayne_Kuhic@sydney.com",
  "Nikita@garfield.biz",
  "Lew@alysha.tv",
  "Hayden@althea.biz",
  "Presley.Mueller@myrl.com",
  "Dallas@ole.me",
  "Mallory_Kunze@marie.org",
  "Meghan_Littel@rene.us",
  "Carmen_Keeling@caroline.name",
  "Veronica_Goodwin@timmothy.net",
  "Oswald.Vandervort@leanne.org",
  "Kariane@jadyn.tv",
  "Nathan@solon.io",
  "Maynard.Hodkiewicz@roberta.com",
  "Christine@ayana.info",
  "Preston_Hudson@blaise.tv",
  "Vincenza_Klocko@albertha.name",
  "Madelynn.Gorczany@darion.biz",
  "Mariana_Orn@preston.org",
  "Noemie@marques.me",
  "Khalil@emile.co.uk",
  "Sophia@arianna.co.uk",
  "Jeffery@juwan.us",
  "Isaias_Kuhic@jarrett.net",
];

createApp({
  template: `
    <div class="container">
        <div class="form-group">
          <input type="search" v-model="search" />
        </div>
        <ul>
          <li v-for="email in foundEmails" :key="email" :class="{ marked: email.matched}">{{ email.email }}</li>
        </ul>
      </div>
`,

  data() {
    return {
      emails,
      search: "",
    };
  },

  computed: {
    foundEmails() {
      return this.emails.map((item) => {
        const email = item.toLowerCase();
        const searchValue = this.search.toLowerCase().trim();
        const isMatched = email.includes(searchValue);

        if (this.search) {
          return { email: item, matched: isMatched };
        } else {
          return { email: item, matched: false };
        }
      });
    },
  },
}).mount("#app");
