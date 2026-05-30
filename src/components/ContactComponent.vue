<template>
    <div class="bg-background w-full h-screen flex items-start justify-center pt-10">
        <div class="contact-card bg-backgroundComp">
            <h1>{{ name }}</h1>
            <p><strong>Téléphone:</strong> {{ phone }}</p>
            <p><strong>Email:</strong> <a :href="'mailto:' + email">{{ email }}</a></p>
            <p><strong>Mastodon:</strong> <a :href="mastodonLink" target="_blank">{{ mastodonHandle }}</a></p>
        </div>
    </div>
</template>

<script>
export default {
    name: "ContactCard",
    data() {
        return {
            name: "Marius Boucard Bocciarelli",
            phone: "0783811832",
            email: "marius.boucard-bocciarelli@laposte.net",
            mastodonHandle: "@mariusboucard@mastodon.social",
            mastodonLink: "https://mastodon.social/@mariusboucard",
        };
    },
};
</script>

<style scoped>
.contact-card {
    max-width: 400px;
    padding: 20px;
    text-align: center;
    border: 1px solid #ccc;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    font-family: Arial, sans-serif;
}

.contact-card h1 {
    margin-bottom: 10px;
    font-size: 24px;
}

.contact-card p {
    margin: 5px 0;
}

.contact-card a {
    color: #0073e6;
    text-decoration: none;
}

.contact-card a:hover {
    text-decoration: underline;
}
</style>