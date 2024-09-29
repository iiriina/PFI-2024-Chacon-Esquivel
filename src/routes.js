import Icon from "@mui/material/Icon";

// Pages
import Product from "layouts/pages/landing-pages/product";
import Dashboard from "layouts/dashboard";
import Celulares from "layouts/pages/landing-pages/cellphones";


const routes = [
  {
    name: "Productos",
    icon: <Icon>dashboard</Icon>,
    columns: 1,
    rowsPerColumn: 2,
    collapse: [
      {
        name: "Categorias",
        collapse: [
          {
            name: "Celulares",
            route: "/pages/celulares",
            component: <Celulares />,
          },
          {
            name: "Computadoras",
            route: "/pages/landing-pages/products",
            component: <Product />,
          }
        ],
      },
    ],
  },
  {
    name: "Dashboards",
    icon: <Icon>article</Icon>,
    collapse: [
      {
        name: "Dashboard",
        route: "/pages/dashboard",
        component: <Dashboard />,
      }
    ]
  }
];

export default routes;