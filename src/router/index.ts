import { createRouter, createWebHistory } from "vue-router";
import sourceCode from "../lib";

export default createRouter({
    history: createWebHistory("/mirage-tank-images/"),
    routes: [{
        path: "/",
        name: "Home",
        component: () => import("../views/MirageTankBuilder.vue"),
        children: [{
            path: "",
            name: "Descriptions",
            component: () => import("../components/Descriptions.vue")
        }, {
            path: "builder",
            name: "Builder",
            component: () => import("../components/Builder.vue")
        }, {
            path: "algorithm",
            name: "Algorithm",
            component: () => import("../components/Algorithm.vue")
        }, {
            path: "code",
            redirect: { name: "Python" }
        }, {
            path: "code/python",
            name: "Python",
            component: () => import("../components/CodeDisplay.vue"),
            props: sourceCode.python
        }, {
            path: "code/typescript",
            name: "TypeScript",
            component: () => import("../components/CodeDisplay.vue"),
            props: sourceCode.typescript
        }]
    }]
});
