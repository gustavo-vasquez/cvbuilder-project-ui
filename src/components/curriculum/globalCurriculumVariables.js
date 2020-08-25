export const defaultProperties = {
	DEFAULT_AVATAR_PATH: "/img/profile_coat.png",
    DEFAULT_SUMMARY_TITLE: "Resumen profesional",
    SOCIALPLACEHOLDER: "URL o nombre de usuario",
    FACEBOOK_DOMAIN_START: "https://www.facebook.com/",
    LINKEDIN_DOMAIN_START: "https://www.linkedin.com/in/",
    GITHUB_DOMAIN_START: "https://github.com/",
    TWITTER_DOMAIN_START: "https://twitter.com/",
    CERTIFICATE_ONLINE_TEXT: "A distancia",
    CERTIFICATE_CLASS_TEXT: "Presencial",
    CERTIFICATE_INPROGRESS_TEXT: "En progreso"
}

export const formattedInterestList = interests => {
	let result = [];
	interests.map((interest, index) => index !== 0 ? result.push(interest.name.toLowerCase()) : result.push(interest.name));
	return result.join(", ");
}