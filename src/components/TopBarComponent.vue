<template>
  <div class="topbar bg- bg-primary">
    <!-- Profile Section -->
    <div class="flex profile-container">

      <img src="@/assets/images/profilPicture.jpg" alt="Profile Picture" class="profile-pic" />

      <div class="profile">
        <div class="profile-info">
          <h2>Marius Boucard Bocciarelli</h2>
          <p class="text-white">Ingénieur informatique</p>
          <p class="text-white">Passionné de musique et de bricolage informatique</p>
        </div>

      </div>
      <div class="external-links">
        <a href="https://github.com/MariusBoucard" target="_blank"
          class="external-link text-white bg-primaryButton hover:bg-secondaryButton hover:text-primary">GitHub</a>
        <a href="https://open.spotify.com/intl-fr/artist/1ihPL4eI2ThTMGhWiPVef0" target="_blank"
          class="external-link text-white bg-primaryButton hover:text-primary hover:bg-secondaryButton">Spotify</a>
        <a href="https://www.linkedin.com/in/marius-boucard-bocciarelli-390793222/" target="_blank"
          class="external-link text-white bg-primaryButton hover:text-primary hover:bg-secondaryButton">LinkedIn</a>
      </div>
    </div>


    <!-- Router Links -->
    <div class="router-links flex flex-wrap">
      <router-link to="/motivations"
        class="bubble bg-secondaryButton text-white hover:bg-primaryButton">Motivations</router-link>
      <router-link to="/cv" class="bubble bg-secondaryButton text-white hover:bg-primaryButton">CV</router-link>
      <router-link to="/projects"
        class="bubble bg-secondaryButton text-white hover:bg-primaryButton">Projects</router-link>
      <router-link to="/passions"
        class="bubble bg-secondaryButton text-white hover:bg-primaryButton">Passions</router-link>
      <router-link to="/contact"
        class="bubble bg-secondaryButton text-white hover:bg-primaryButton">Contact</router-link>
    </div>
  </div>
</template>

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

.profile {
  display: flex;
  width: 100%;
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

.external-links {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  justify-content: end;
  gap: 10px;
  margin-top: auto;
}

.external-link {
  text-decoration: none;
  font-weight: bold;
  padding:  10px;
  border-radius: 10px;
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
  border-radius: 20px;
  font-weight: bold;
  transition: background-color 0.3s ease, transform 0.2s ease;
  background: rgba(255, 255, 255, 0.2);
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.3);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.bubble:hover {
  background: rgba(255, 255, 255, 0.4);
  transform: scale(1.05);
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

  .external-links {
    justify-content: center;
    margin-top: 20px;
  }
}
</style>