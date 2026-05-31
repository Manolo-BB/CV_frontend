<template>
  <div class="topbar bg-primary">
    <div class="flex profile-container">

      <img src="@/assets/images/profilPicture.jpg" alt="Profile Picture" class="profile-pic" />

      <div class="profile">
        <div class="profile-info">
          <h2>{{ profile.name }}</h2>
          <p class="text-white">{{ profile.title }}</p>
          <p class="text-white">{{ profile.description }}</p>
        </div>
      </div> <div class="contact">
        <p><strong>Tél :</strong> {{ profile.phone }}</p>
        <p><strong>Email :</strong> <a :href="'mailto:' + profile.email">{{ profile.email }}</a></p>
      </div>

      <div class="external-links">
        <a :href="profile.links.github" target="_blank"
          class="external-link hover:bg-secondaryButton hover:text-primary"
          title="GitHub">
          <img src="@/assets/images/GitHub.png" alt="GitHub Logo" class="social-icon" />
        </a>

        <a :href="profile.links.linkedin" target="_blank"
          class="external-link hover:bg-secondaryButton hover:text-primary"
          title="LinkedIn">
          <img src="@/assets/images/linkedin.png" alt="LinkedIn Logo" class="social-icon" />
        </a>
      </div>
    </div>

    <!-- Router Links -->
    <div class="router-links flex flex-wrap">
      <router-link to="/motivations"
        class="bubble text-white">Motivations</router-link>
      <router-link to="/cv"
        class="bubble bg-secondaryButton text-white hover:bg-primaryButton">CV</router-link>
      <router-link to="/projects"
        class="bubble bg-secondaryButton text-white hover:bg-primaryButton">Projects</router-link>
      <router-link to="/passions"
        class="bubble bg-secondaryButton text-white hover:bg-primaryButton">Passions</router-link>
    </div>
  </div>
</template>

<script>
import profileData from '@/data/ProfileData.json';

export default {
  name: "TopBar",
  data() {
    return {
      profile: profileData
    };
  }
};
</script>

<style scoped>
.topbar {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 20px;
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.profile-container {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
}

.profile {
  display: flex;
  flex: 1;
  align-items: center;
  text-align: left;
  position: relative;
  flex-wrap: wrap;
}

.profile-pic {
  height: 150px;
  width: 150px;
  border-radius: 50%;
  margin-right: 20px;
  border: 5px solid #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.profile-info {
  flex: 1;
}

.profile-info h2 {
  margin: 0;
  font-size: 2.0rem;
  font-weight: bold;
}

.profile-info p {
  margin: 0;
  font-size: 1.1rem;
}

.contact p {
  margin: 5px 0;
  color: rgb(0, 0, 0);
  font-size: 1rem;
}

.contact a {
  color: #000000;
  text-decoration: none;
}

.contact a:hover {
  text-decoration: underline;
}

.external-links {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  justify-content: end;
  gap: 8px;
  margin-top: auto;
}

.external-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;

  /* On définit une zone de clic carrée et petite */
  width: 100px;
  height: 100px;
  border-radius: 50%; /* Rend le fond du hover parfaitement rond */

  background: transparent;
  transition: all 0.2s ease;
}

.router-links {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 15px;
  width: 100%;
  margin-top: 20px;
}

.external-link:hover {
  text-decoration: underline;
  background: rgba(255, 255, 255, 0.4);
}

.bubble {
  text-decoration: none;
  padding: 10px 20px;
  border-radius: 10px;
  font-weight: bold;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--primaryButton, #1e293b);
}

/* Style au survol pour les boutons non-sélectionnés */
.bubble:not(.router-link-active):hover {
  background-color: var(--secondaryButton, rgba(62, 60, 60, 0.675));
  transform: scale(1.05);
}

/*Style du bouton sélectionné*/
.bubble.router-link-active {
  background-color: var(--secondaryButton, rgba(62, 60, 60, 0.675))!important;
  color: #cbd5e1 !important; /* Texte légèrement atténué */
  border-color: rgba(255, 255, 255, 0.1);
  cursor: default; /* Indique qu'on ne peut pas recliquer dessus */
  transform: none; /* Désactive l'effet de zoom */
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.2); /* Petit effet enfoncé */
}


/* Media Query for Small Screens */
@media (max-width: 720px) {
  .profile-container {
    flex-direction: column;
    align-items: center;
  }

  .profile {
    align-items: center;
    text-align: center;
  }

  /* AJOUT MOBILE : L'encart s'adapte sur petit écran */
  .contact {
    width: 100%;
    text-align: center;
    box-sizing: border-box;
  }

  .external-links {
    justify-content: center;
    margin-top: 20px;
  }
}
</style>
