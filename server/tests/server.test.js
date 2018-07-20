const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../model/todo');

const todos = [{
    _id: new ObjectID(),
    text: 'First test todo'
}, {
    _id: new ObjectID(),
    text: 'Second test todo',
    completed: true,
    completedAt: 123
}];

beforeEach((done) => {

    //clear db for each test
    Todo.remove({}).then(() => {
        return Todo.insertMany(todos);
    })
        .then(() => done());
});

describe('POST /todos', () => {
    it('Should create a new todo', (done) => {
        var text = 'Test todo text';
        request(app)
            .post('/todos')
            .send({text})
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text);
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                Todo.find({text}).then((todos) => {
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    done();
                }).catch((err) => {
                    return done(err);
                });
            });
    });

    it('Should not create todo with invalid todo data', (done) => {
        var text = '';

        request(app)
            .post('/todos')
            .send({text})
            .expect(400)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                Todo.find().then((todos) => {
                    expect(todos.length).toBe(2);
                    done();
                })
                    .catch((err) => {
                        return done(err);
                    });
            })
    });
});

describe('GET /todos', () => {
    it('should get all todos', (done) => {
        request(app)
            .get('/todos')
            .expect(200)
            .expect((res) => {
                expect(res.body.todos.length).toBe(2);
            })
            .end(done());
    });
});

describe('GET /todos/:id', () => {
    it('Should get todo by id', (done) => {
        request(app)
            .get(`/todos/${todos[0]._id.toHexString()}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(todos[0].text);
            })
            .end(done);
    });

    it('Should return 404 if todo not found', (done) => {
        var wrongId = new ObjectID().toHexString();

        request(app)
            .get(`/todos/${wrongId}`)
            .expect(404)
            .end(done);
    });

    it('Should return 404 for non objects id', (done) => {
        request(app)
            .get('/todos/123')
            .expect(404)
            .end(done);
    });
});

describe('DELETE /todos/:id', () => {
    it('Should delete todo by id', (done) => {

        var id = todos[0]._id.toHexString();
        request(app)
            .delete(`/todos/${id}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(todos[0].text);
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                Todo.findById(id).then((todo) => {
                    expect(todo).toNotExist();
                    done();
                }).catch((err) => {
                    return done(err);
                });
            });
    });

    it('Should return 404 if todo not found', (done) => {
        var wrongId = new ObjectID().toHexString();

        request(app)
            .delete(`/todos/${wrongId}`)
            .expect(404)
            .end(done);
    });

    it('Should return 404 if id not valid', (done) => {
        request(app)
            .delete('/todos/123abc')
            .expect(404)
            .end(done);
    });
});

describe('PATCH /todos/:id', () => {
    it('Should update the todo', (done) => {
        var id = todos[0]._id.toHexString();
        var text = 'test text';

        request(app)
            .patch(`/todos/${id}`)
            .send({
                text,
                completed: true
            })
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(text);
                expect(res.body.todo.completed).toBe(true);
                expect(res.body.todo.completedAt).toBeA('number');
            })
            .end(done);
    });

    it('Should clear competedAt when todo is not completed', (done) => {
        var id = todos[1]._id.toHexString();
        var completed = false;

        request(app)
            .patch(`/todos/${id}`)
            .send({completed})
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.completed).toBe(completed);
                expect(res.body.todo.completedAt).toNotExist();
            })
            .end(done);
    });
});