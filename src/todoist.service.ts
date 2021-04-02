import {Injectable} from '@nestjs/common';
import _ from "lodash";

require('dotenv').config();
const Todoist = require('todoist').v8
const todoist = Todoist(process.env.TODOIST_API_KEY)


@Injectable()
export class TodoistService {
    // constructor() {
    // }

    public async getOneRandomTodo(): Promise<string> {
        await todoist.sync();
        // const  labels = todoist.labels.get();
        // console.log('labels',labels);
        const projectsToIgnore = todoist.projects
            .get()
            .filter(prj => prj.name === 'Alexa Einkaufsliste')
            .map(prj => prj.id)
        ;
        const items = todoist.items.get();
        const filteredItems = items
            .filter(item => item.date_completed === undefined || item.date_completed === null)
            .filter(item => item.is_deleted === 0)
            .filter(item => item.content !== null && item.content.length > 0)
            .filter(item => projectsToIgnore.indexOf(item.project_id) == -1)
            .map(item => item.content)
            .sort();

        // console.log('items', filteredItems);
        return filteredItems[Math.floor(Math.random() * filteredItems.length - 1)];
    }

}
