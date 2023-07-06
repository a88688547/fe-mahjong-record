import { Layout } from '../../component/Layout';
// import {
//   LoginPage,
//   HomePage,
//   MemberCenterPage,
//   ComputerQuestionPage,
//   ExamPaperListPage,
//   StudentIntelligentPropositionPage,
//   StudentExamPaperListPage,
//   ManualPropositionPage,
//   SearchPaperListPage,
//   KnowledgePropositionPage,
//   MaintenancePage,
// } from 'views';

import { HomePage } from '../../pages/Homepage';

const routes = [
  // {
  //   path: '/login',
  //   component: 'loginPageComponent',
  //   exact: true,
  // },
  {
    path: '/',
    component: Layout,
    exact: true,
    routes: [
      {
        path: '/',
        component: HomePage,
        name: 'home',
        exact: true,
      }
    ],
  },
  // {
  //   path: '/login',
  //   component: MainLayout,
  //   exact: true,
  //   routes: [
  //     {
  //       path: '/login',
  //       component: LoginPage,
  //       name: 'login',
  //       exact: true,
  //     }
  //   ],
  // },
  // {
  //   path: '/memberCenter',
  //   component: MainLayout,
  //   exact: true,
  //   routes: [
  //     {
  //       path: '/memberCenter',
  //       component: MemberCenterPage,
  //       name: 'memberCenter',
  //       exact: true,
  //     }
  //   ],
  // },
  // {
  //   path: '/manualProposition',
  //   component: MainLayout,
  //   exact: true,
  //   routes: [
  //     {
  //       path: '/manualProposition',
  //       component: ManualPropositionPage,
  //       name: 'manualProposition',
  //       exact: true,
  //     }
  //   ],
  // },
  // {
  //   path: '/knowledgeProposition',
  //   component: MainLayout,
  //   exact: true,
  //   routes: [
  //     {
  //       path: '/knowledgeProposition',
  //       component: KnowledgePropositionPage,
  //       name: 'knowledgeProposition',
  //       exact: true,
  //     }
  //   ],
  // },
  // {
  //   path: '/computerQuestion',
  //   component: MainLayout,
  //   exact: true,
  //   routes: [
  //     {
  //       path: '/computerQuestion',
  //       component: ComputerQuestionPage,
  //       name: 'computerQuestion',
  //       exact: true,
  //     }
  //   ],
  // },
  // {
  //   path: '/examPaperList',
  //   component: MainLayout,
  //   exact: true,
  //   routes: [
  //     {
  //       path: '/examPaperList',
  //       component: ExamPaperListPage,
  //       name: 'examPaperList',
  //       exact: true,
  //     }
  //   ],
  // },
  // {
  //   path: '/studentIntelligentProposition',
  //   component: MainLayout,
  //   exact: true,
  //   routes: [
  //     {
  //       path: '/studentIntelligentProposition',
  //       component: StudentIntelligentPropositionPage,
  //       name: 'studentIntelligentProposition',
  //       exact: true,
  //     }
  //   ],
  // },
  // {
  //   path: '/studentExamPaperList',
  //   component: MainLayout,
  //   exact: true,
  //   routes: [
  //     {
  //       path: '/studentExamPaperList',
  //       component: StudentExamPaperListPage,
  //       name: 'studentExamPaperList',
  //       exact: true,
  //     }
  //   ],
  // },
  // {
  //   path: '/SearchPaperListPage',
  //   component: MainLayout,
  //   exact: true,
  //   routes: [
  //     {
  //       path: '/SearchPaperListPage',
  //       component: SearchPaperListPage,
  //       name: 'SearchPaperListPage',
  //       exact: true,
  //     }
  //   ],
  // },
  // {
  //   path: '/maintenancePage',
  //   component: MainLayout,
  //   exact: true,
  //   routes: [
  //     {
  //       path: '/maintenancePage',
  //       component: MaintenancePage,
  //       name: 'maintenancePage',
  //       exact: true,
  //     }
  //   ],
  // },
];
export default routes;
