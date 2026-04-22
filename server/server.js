require('dotenv').config();
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./graphql/schema');
const morgan = require('morgan');
const path = require('path');
const { connectDB } = require('./db');

const UserRouter = require('./controllers/User');
const SecretaryRouter = require('./controllers/Secretary');
const DoctorRouter = require('./routes/doctorRoutes');
const SpecialityRouter = require('./routes/specialityRoutes');
const AgendaController = require('./controllers/agendaController');
const cors = require('cors');
const { isLoggedIn } = require('./controllers/middleware');

const app = express();

const startServer = async () => {
  await connectDB();

  app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
  }));
  app.use(express.json());

  app.use('/user', UserRouter);
  app.use('/secretary', SecretaryRouter);
  app.use('/doctor', DoctorRouter);
  app.use('/speciality', SpecialityRouter);
  app.use('/agenda', AgendaController);

  app.use('/graphql', isLoggedIn, graphqlHTTP({
    schema,
    graphiql: true,
  }));

  app.use(morgan('dev'));
  app.use(express.static(path.join(__dirname, 'public')));

  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
};

startServer();
