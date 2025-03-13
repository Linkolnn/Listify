// data.js
const data = {
    navMenuItems(menuType = 'header', isAuth = false) {
        const baseItems = isAuth 
            ? menuType === 'header'
                ? [{ isProfile: true }] // Специальный объект для кнопки профиля
                : [
                    { url: "/profile", text: 'Профиль' },
                    { url: "#logout", text: 'Выйти' }
                  ]
            : [
                { url: "/register", text: 'Регистрация' },
                { url: "/login", text: 'Войти' }
              ];

        const additionalItems = {
            footer: [
                { url: "/#more", text: 'О Listify' }
            ],
            header: []
        };

        return [...baseItems, ...(additionalItems[menuType] || [])];
    },
    welcomeListBtn(isAuth = false) {
        return isAuth
            ? [
                {
                    url: "/profile",
                    text: "Начать"
                },
                {
                    url: "/#more",
                    text: "О Listify"
                }
              ]
            : [
                {
                    url: "/register",
                    text: "Начать"
                },
                {
                    url: "/#more",
                    text: "О Listify"
                }
              ];
    },
}

export default data;