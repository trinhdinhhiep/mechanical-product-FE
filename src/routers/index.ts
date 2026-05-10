import { ROUTES } from '@/utils/routes'
import { createBrowserRouter } from 'react-router-dom'

const router = createBrowserRouter([
  {
    id: 'root',
    path: ROUTES.home,
    lazy: async () => {
      const MainLayout = await import('../layouts/MainLayout')
      return { Component: MainLayout.default }
    },
    children: [
      {
        index: true,
        async lazy() {
          const HomePage = await import('../pages/Home')
          return { Component: HomePage.default }
        },
      },
      {
        path: ROUTES.introduction.slice(1),
        async lazy() {
          const Introduction = await import('../pages/Introduction')
          return { Component: Introduction.default }
        },
      },
      {
        path: ROUTES.news.index,
        async lazy() {
          const News = await import('../pages/News')
          return { Component: News.default }
        },
      },
      {
        path: ROUTES.news.detail(':newsDetailSlug').slice(1),
        async lazy() {
          const NewsDetail = await import('../pages/NewsDetail')
          return { Component: NewsDetail.default }
        },
      },
      {
        path: ROUTES.contact.slice(1),
        async lazy() {
          const Contact = await import('../pages/Contact')
          return { Component: Contact.default }
        },
      },
      {
        path: ROUTES.techLib.slice(1),
        async lazy() {
          const TechLib = await import('../pages/TechLib')
          return { Component: TechLib.default }
        },
      },
      {
        path: ROUTES.product.index,
        async lazy() {
          const Product = await import('../pages/Product')
          return { Component: Product.default }
        },
      },
      {
        path: ROUTES.addCategories.slice(1),
        async lazy() {
          const AddCategory = await import('../pages/AddCategory')
          return { Component: AddCategory.default }
        },
      },
      {
        path: ROUTES.addProducts.slice(1),
        async lazy() {
          const AddProduct = await import('../pages/AddProduct')
          return { Component: AddProduct.default }
        },
      },
      {
        path: ROUTES.addArticles.slice(1),
        async lazy() {
          const AddArticle = await import('../pages/AddArticle')
          return { Component: AddArticle.default }
        },
      },
      {
        path: ROUTES.deleteProducts.slice(1),
        async lazy() {
          const DeleteProduct = await import('../pages/DeleteProduct')
          return { Component: DeleteProduct.default }
        },
      },
      {
        path: ROUTES.deleteArticles.slice(1),
        async lazy() {
          const DeleteArticle = await import('../pages/DeleteArticle')
          return { Component: DeleteArticle.default }
        },
      },
      {
        path: ROUTES.product.category(':categorySlug').slice(1),
        async lazy() {
          const ProductPage = await import('../pages/ProductPage')
          return { Component: ProductPage.default }
        },
      },
      {
        path: ROUTES.product.detail(':categorySlug', ':productSlug').slice(1),
        async lazy() {
          const ProductPage = await import('../pages/ProductPage')
          return { Component: ProductPage.default }
        },
      },
      {
        path: ROUTES.workingProcess.slice(1),
        async lazy() {
          const WorkingProcess = await import('../pages/WorkingProcess')
          return { Component: WorkingProcess.default }
        },
      },

      {
        path: ROUTES.terms.index.slice(1),
        async lazy() {
          const Terms = await import('../pages/Terms')
          return { Component: Terms.default }
        },
      },
      {
        path: ROUTES.terms.generalPolicy.slice(1),
        async lazy() {
          const GeneralPolicy = await import('../pages/Terms/GeneralPolicy')
          return { Component: GeneralPolicy.default }
        },
      },
      {
        path: ROUTES.terms.shippingPolicy.slice(1),
        async lazy() {
          const ShippingPolicy = await import('../pages/Terms/ShippingPolicy')
          return { Component: ShippingPolicy.default }
        },
      },
      {
        path: ROUTES.terms.paymentPolicy.slice(1),
        async lazy() {
          const PaymentPolicy = await import('../pages/Terms/PaymentPolicy')
          return { Component: PaymentPolicy.default }
        },
      },
      {
        path: ROUTES.terms.returnPolicy.slice(1),
        async lazy() {
          const ReturnPolicy = await import('../pages/Terms/ReturnPolicy')
          return { Component: ReturnPolicy.default }
        },
      },
      {
        path: ROUTES.terms.warrantyPolicy.slice(1),
        async lazy() {
          const WarrantyPolicy = await import('../pages/Terms/WarrantyPolicy')
          return { Component: WarrantyPolicy.default }
        },
      },
      {
        path: ROUTES.terms.privacyPolicy.slice(1),
        async lazy() {
          const PrivacyPolicy = await import('../pages/Terms/PrivacyPolicy')
          return { Component: PrivacyPolicy.default }
        },
      },
      {
        path: 'search',
        async lazy() {
          const SearchPage = await import('../pages/SearchPage')
          return { Component: SearchPage.default }
        },
      },
    ],
  },
  {
    path: '/',
    lazy: async () => {
      const AuthLayout = await import('../layouts/AuthLayout')
      return { Component: AuthLayout.default }
    },
    children: [
      {
        path: 'login',
        async lazy() {
          const PageLogin = await import('../pages/Login')
          return { Component: PageLogin.default }
        },
      },
    ],
  },
  {
    path: '*',
    lazy: async () => {
      const PageNotFound = await import('../pages/Errors/PageNotFound')
      return { Component: PageNotFound.default }
    },
  },
])

export default router
