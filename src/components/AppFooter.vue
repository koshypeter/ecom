<template>
  <footer>
    <div class="container pt-5">
      <div class="row">
        <div class="col-md-3 col-6" v-for="(section, index) in footerSections" :key="index">
          <ul class="footer-list">
            <li class="text-light font-weight-bold pb-2">{{ section.title }}</li>
            <li v-for="(item, i) in section.links" :key="i">
              <a class="footer-link font-weight-light" :href="item.href">{{ item.text }}</a>
            </li>
          </ul>
        </div>
      </div>

      <div class="row">
        <div class="col-12 text-center py-5">
          <img id="logo" src="../assets/icon.png" alt="Site Logo" />
        </div>
      </div>
    </div>
  </footer>
</template>

<script>

export default {
  name: "AppFooter",
  data() {
    return {
      footerSections: [
        {
          title: "Get to Know Us",
          links: [
            { text: "About Us", href: "#" },
            { text: "Android App", href: "#" },
            { text: "iOS App", href: "#" }
          ]
        },
        {
          title: "Connect With Us",
          links: [
            { text: "Facebook", href: "#" },
            { text: "Twitter", href: "#" },
            { text: "Instagram", href: "#" }
          ]
        },
        {
          title: "Make Money With Us",
          links: [
            { text: "Sell with Us", href: "#" },
            { text: "Become an Affiliate", href: "#" },
            { text: "Advertise Your Products", href: "#" }
          ]
        },
        {
          title: "Let Us Help You",
          links: [
            { text: "Return Centre", href: "#" },
            { text: "100% Purchase Protection", href: "#" },
            { text: "Help", href: "#" },
            { text: "App Download", href: "#" }
          ]
        }
      ]
    };
  }
};
</script>

<style scoped>
footer {
  margin-top: 100px;
  background-color: #232F3E;
  font-size: 16px;
  font-family: 'Roboto', sans-serif;
}

.footer-list {
  list-style-type: none;
  padding-left: 0;
}

li {
  padding-bottom: 10px;
}

a {
  text-decoration: none;
}

.footer-link {
  color: #DDD;
}

#logo {
  width: 150px;
}
</style>
