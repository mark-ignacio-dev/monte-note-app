import Db from '../db/index';

export class DbMessager {
    
    db: Nedb;
    
    constructor() {
        let setup = new Db();
        this.db = setup.getDb();
    }

    getNotebooks(): any {
        return new Promise((resolve) => {
            this.db.find({ name: 'notebooks' }, (err: any, docs: any): any => {
                if (docs.length) {
                    resolve(docs[0].notebooks);
                }
                resolve([]);
            });
        });
    }

    getNotebooksLocation(): any {
        return this.db.find({ name: 'notebooksLocation' }, (err: Error, docs: any) => {
            if (docs.length) {
                localStorage.setItem('NOTEBOOK_SAVE_DIRECTORY', docs[0].notebooksLocation); 
                return docs[0].notebooksLocation;
            }
            return '';
        });
    }

    addNotebook(name: string): any {
        return new Promise((resolve) => {
            this.db.update({ name: 'notebooks' }, { $push: { notebooks: name } }, {}, (err: Error) => {
                if (err) {
                    resolve(false);
                }
                resolve(true);
            });
        });
    }

    addExistingNotebooks(notebooks: string[]): any {
        return new Promise((resolve) => {
            this.db.find({ name: 'notebooks' }, (err: Error, docs: any) => {
                if (docs.length) {
                    this.db.update({ name: 'notebooks' }, { $push: { notebooks: name }}, {}, () => {
                        resolve(true);
                    });
                } else {
                    this.db.insert({ name: 'notebooks', notebooks: notebooks }, () => {
                        resolve(true);
                    });
                }
            });
        });
    }

    setNotebooksLocation(location: string): void {
        let documentName = 'notebooksLocation';
        this.db.find({ name: documentName }, (err: Error, docs: any) => {
            if (docs.length) {
                this.db.update( { name: documentName }, { notebooksLocation: location });
            } else {
                this.db.insert( {name: documentName, notebooksLocation: location });
            }
        });
    }

    messageDb() {
        console.log('LOLOLOLO');
        this.db.find({ name: 'notebooks' }, function (err: any, docs: any) {
            console.log(docs);
        });
    }
}

export default DbMessager;