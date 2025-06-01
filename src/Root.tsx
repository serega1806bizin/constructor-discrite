import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { App } from './App';
import { GlobalStateProvider } from './Store/Store';
import { ProductPage } from './modules/ProductPage';
import { NotFoundPage } from './components/NotFoundPage';
import { ConstructorPage } from './modules/ConstructorPage';
import { FormPage } from './modules/FormPage/FromPage';
import { DetailsTask } from './modules/DetailsTask';
import { EditPage } from './modules/EditPage';
import { AnswerPage } from './modules/AnswerPage';

export const Root = () => (
  <Router>
    <GlobalStateProvider>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="task">
            <Route index element={<ProductPage />} />
            <Route path=":taskId" element={<DetailsTask />}>
              <Route path="edit" element={<EditPage />} />
            </Route>
          </Route>
          <Route path="create">
            <Route index element={<ConstructorPage />} />
          </Route>
          <Route path="test">
            <Route path=":testId" element={<FormPage />} />
          </Route>
          <Route path="answer">
            <Route path=":answerId/test/:testId" element={<AnswerPage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </GlobalStateProvider>
  </Router>
);
