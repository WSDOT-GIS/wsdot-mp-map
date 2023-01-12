import { publish } from "gh-pages";

publish("dist", (error) => {
    if (error) {
        console.error(error instanceof Error ? error.message : error, error);
    }
});