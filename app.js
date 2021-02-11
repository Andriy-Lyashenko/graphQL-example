const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const colors = require('colors')

const { graphqlHTTP } = require('express-graphql');

const { buildSchema } = require('graphql')

const app = express();

app.use(bodyParser.json());

const events = [
]

console.log(events)
app.use('/graphql', graphqlHTTP({
    schema: buildSchema(`

        type Event {
            _id: ID!
            title: String!
            description: String!
            price: Float!
            date: String!
        }

        type RootQuery {
            events: [Event!]!
        }

        input EventInput {
            title: String!
            description: String!
            price: Float!
            date: String!
        }

        type RootMutation {
            createEvent(eventInput: EventInput): Event
        }

        schema {
            query: RootQuery
            mutation: RootMutation
        }
    `),

    rootValue: {
        events: ()=>{
            return events
        },
        createEvent: (args)=> {
            const event = {
                 _id:Math.random().toString(),
                 title: args.eventInput.title,
                 description: args.eventInput.description,
                 price: +args.eventInput.price,
                 date: args.eventInput.date
            };

            console.log(event)

            events.push(event)

            return event

        }
    },
    graphiql: true ,
}))


const PORT = process.nextTick.PORT || 4000

app.listen(PORT, ()=> {
    console.log(`App is running on ${PORT} port`.green.italic.underline)
})