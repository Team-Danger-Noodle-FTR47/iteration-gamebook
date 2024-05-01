const request = require('supertest');
const server = 'http://localhost:8080';
import React from 'react';
import { Provider } from 'react-redux';
import App from '../client/App';

//server testing:
describe('Route integration', () => {
  describe('/login', () => {
    describe('GET', () => {
      // Note that we return the evaluation of `request` here! It evaluates to
      // a promise, so Jest knows not to say this test passes until that
      // promise resolves. See https://jestjs.io/docs/en/asynchronous
      it('responds with 200 status and text/html content type', () => {
        return request(server)
          .get('/')
          .expect('Content-Type', /text\/html/)
          .expect(200);
      });
    });
  });

  describe('/home', () => {
    describe('GET', () => {
      xit('responds with 200 status and application/json content type', () => {});
    });
  });
});

//react testing
describe('React-Redux integration tests', () => {
  describe('Empty state before interactions', () => {
    beforeEach(async () => {
      const app = await render(
        <Provider>
          <App />
        </Provider>
      );
    });

    test('Every card loads with a picture, name, genre, platform', () => {});

    test('The page has the GameBook heading', () => {
      //this line uses destructuring to extract the getByText function
      //from the object returned by the render function.
      //This allows you to directly access the getByText
      //function without needing to use dot notation.
      //After rendering the component, getByText can be used to query
      //for elements within the rendered component by their text content.
      const { getByText } = render(
        <Provider>
          <App />
        </Provider>
      );
      const heading = getByText('GameBook');
      expect(heading).toBeInTheDocument();
    });

    test('home page loads with 8 platform buttons and 9 genre buttons', () => {});
  });
});

//db test - currently we are not creating anything to add to the database
// describe('db unit tests', () => {
//     /**
//      * Jest runs the "beforeAll" function once, before any tests are executed.
//      * Here, we write to the file and then reset our database model. Then, we
//      * invoke the "done" callback to tell Jest our async operations have
//      * completed. This way, the tests won't start until the "database" has been
//      * reset to an empty Array!
//      */
//     beforeAll((done) => {
//       fs.writeFile(testJsonFile, JSON.stringify([]), () => {
//         db.reset();
//         done();
//       });
//     });

//     afterAll((done) => {
//       fs.writeFile(testJsonFile, JSON.stringify([]), done);
//     });

//       // TODO: Finish unit testing the sync function

//       xit('returns an error when location and/or cards fields are not provided', () => {

//       });
//     })
