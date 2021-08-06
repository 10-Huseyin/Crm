import React from 'react';

const Toaster = React.lazy(() => import('../components/notifications/toaster/Toaster'));
const Tables = React.lazy(() => import('../components/base/tables/Tables'));

const Breadcrumbs = React.lazy(() => import('../components/base/breadcrumbs/Breadcrumbs'));
const Cards = React.lazy(() => import('../components/base/cards/Cards'));
const Carousels = React.lazy(() => import('../components/base/carousels/Carousels'));
const Collapses = React.lazy(() => import('../components/base/collapses/Collapses'));
const BasicForms = React.lazy(() => import('../components/base/forms/BasicForms'));

const Jumbotrons = React.lazy(() => import('../components/base/jumbotrons/Jumbotrons'));
const ListGroups = React.lazy(() => import('../components/base/list-groups/ListGroups'));
const Navbars = React.lazy(() => import('../components/base/navbars/Navbars'));
const Navs = React.lazy(() => import('../components/base/navs/Navs'));
const Paginations = React.lazy(() => import('../components/base/paginations/Pagnations'));
const Popovers = React.lazy(() => import('../components/base/popovers/Popovers'));
const ProgressBar = React.lazy(() => import('../components/base/progress-bar/ProgressBar'));
const Switches = React.lazy(() => import('../components/base/switches/Switches'));

const Tabs = React.lazy(() => import('../components/base/tabs/Tabs'));
const Tooltips = React.lazy(() => import('../components/base/tooltips/Tooltips'));
const BrandButtons = React.lazy(() => import('../components/buttons/brand-buttons/BrandButtons'));
const ButtonDropdowns = React.lazy(() => import('../components/buttons/button-dropdowns/ButtonDropdowns'));
const ButtonGroups = React.lazy(() => import('../components/buttons/button-groups/ButtonGroups'));
const Buttons = React.lazy(() => import('../components/buttons/buttons/Buttons'));
const Charts = React.lazy(() => import('../components/charts/Charts'));
//const Stats = React.lazy(() => import('../components/charts/Stats'));
const Dashboard = React.lazy(() => import('../components/dashboard/Dashboard'));
const CoreUIIcons = React.lazy(() => import('../components/icons/coreui-icons/CoreUIIcons'));
const Flags = React.lazy(() => import('../components/icons/flags/Flags'));
const Brands = React.lazy(() => import('../components/icons/brands/Brands'));
const Alerts = React.lazy(() => import('../components/notifications/alerts/Alerts'));
const Badges = React.lazy(() => import('../components/notifications/badges/Badges'));
const Modals = React.lazy(() => import('../components/notifications/modals/Modals'));
const Colors = React.lazy(() => import('../components/theme/colors/Colors'));
const Typography = React.lazy(() => import('../components/theme/typography/Typography'));
const Widgets = React.lazy(() => import('../components/widgets/Widgets'));
const Users = React.lazy(() => import('../components/users/Users'));
const UserDetail = React.lazy(() => import('../components/users/UserDetail'));
const Roles = React.lazy(() => import('../components/roles/Roles'));
const RoleDetail = React.lazy(() => import('../components/roles/RoleDetail'));
const SocialMedias = React.lazy(() => import('../components/socialMedias/socialMedia'));
const SocialMediaDetail = React.lazy(() => import('../components/socialMedias/socialMediaDetail'));
const Medias = React.lazy(() => import('../components/medias/Medias'));
const MediaDetail = React.lazy(() => import('../components/medias/MediaDetail'));
const Products = React.lazy(() => import('../components/products/Products'));
const ProductDetail = React.lazy(() => import('../components/products/ProductDetail'));
const Experts = React.lazy(() => import('../components/experts/Experts'));
const ExpertDetail = React.lazy(() => import('../components/experts/ExpertDetail'));
const IconBox = React.lazy(() => import('../components/iconBox/IconBox')); 
const IconBoxDetail = React.lazy(() => import('../components/iconBox/IconBoxDetail'));
const Messages = React.lazy(() => import('../components/messages/Messages'));
const MessageDetail = React.lazy(() => import('../components/messages/MessageDetail'));
const Sections = React.lazy(() => import('../components/sections/Sections'));
const SectionDetail = React.lazy(() => import('../components/sections/SectionDetail'));
const Subscribers = React.lazy(() => import('../components/subscribers/Subscribers'));
const SubscriberDetail = React.lazy(() => import('../components/subscribers/SubscriberDetail'));

const Sliders = React.lazy(() => import('../components/sliders/Sliders'));
const SliderDetail = React.lazy(() => import('../components/sliders/SliderDetail'));


const CompanyIntros = React.lazy(() => import('../components/CompanyIntroduction/CompanyIntros'));
const CompanyIntroDetail = React.lazy(() => import('../components/CompanyIntroduction/CompanyIntroDetail'));


const CProfiles = React.lazy(() => import('../components/companyProfile/CProfiles'));
const CProfileDetail = React.lazy(() => import('../components/companyProfile/CProfileDetail'));

const Menus = React.lazy(() => import('../components/menus/Menus'));
const MenuDetail = React.lazy(() => import('../components/menus/MenuDetail'));
const Blogs = React.lazy(() => import('../components/blogs/Blogs'));
const BlogDetail = React.lazy(() => import('../components/blogs/BlogDetail'));
const Comments = React.lazy(() => import('../components/comments/Comments'));
const CommentDetail = React.lazy(() => import('../components/comments/CommentDetail'));

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/theme', name: 'Theme', component: Colors, exact: true },
  { path: '/theme/colors', name: 'Colors', component: Colors },
  { path: '/theme/typography', name: 'Typography', component: Typography },
  { path: '/base', name: 'Base', component: Cards, exact: true },
  { path: '/base/breadcrumbs', name: 'Breadcrumbs', component: Breadcrumbs },
  { path: '/base/cards', name: 'Cards', component: Cards },
  { path: '/base/carousels', name: 'Carousel', component: Carousels },
  { path: '/base/collapses', name: 'Collapse', component: Collapses },
  { path: '/base/forms', name: 'Forms', component: BasicForms },
  { path: '/base/jumbotrons', name: 'Jumbotrons', component: Jumbotrons },
  { path: '/base/list-groups', name: 'List Groups', component: ListGroups },
  { path: '/base/navbars', name: 'Navbars', component: Navbars },
  { path: '/base/navs', name: 'Navs', component: Navs },
  { path: '/base/paginations', name: 'Paginations', component: Paginations },
  { path: '/base/popovers', name: 'Popovers', component: Popovers },
  { path: '/base/progress-bar', name: 'Progress Bar', component: ProgressBar },
  { path: '/base/switches', name: 'Switches', component: Switches },
  { path: '/base/tables', name: 'Tables', component: Tables },
  { path: '/base/tabs', name: 'Tabs', component: Tabs },
  { path: '/base/tooltips', name: 'Tooltips', component: Tooltips },
  { path: '/buttons', name: 'Buttons', component: Buttons, exact: true },
  { path: '/buttons/buttons', name: 'Buttons', component: Buttons },
  { path: '/buttons/button-dropdowns', name: 'Dropdowns', component: ButtonDropdowns },
  { path: '/buttons/button-groups', name: 'Button Groups', component: ButtonGroups },
  { path: '/buttons/brand-buttons', name: 'Brand Buttons', component: BrandButtons },
  { path: '/charts', name: 'Charts', component: Charts },
  // { path: '/stats', name: 'Stats', component: Stats },
  { path: '/icons', exact: true, name: 'Icons', component: CoreUIIcons },
  { path: '/icons/coreui-icons', name: 'CoreUI Icons', component: CoreUIIcons },
  { path: '/icons/flags', name: 'Flags', component: Flags },
  { path: '/icons/brands', name: 'Brands', component: Brands },
  { path: '/notifications', name: 'Notifications', component: Alerts, exact: true },
  { path: '/notifications/alerts', name: 'Alerts', component: Alerts },
  { path: '/notifications/badges', name: 'Badges', component: Badges },
  { path: '/notifications/modals', name: 'Modals', component: Modals },
  { path: '/notifications/toaster', name: 'Toaster', component: Toaster },
  { path: '/widgets', name: 'Widgets', component: Widgets },
  { path: '/experts', exact: true,  name: 'Experts', component: Experts },
  { path: '/experts/add', exact: true,  name: 'Expert Add', component: ExpertDetail },
  { path: '/experts/:id', exact: true, name: 'Expert Details', component: ExpertDetail },
  { path: '/iconBox', exact: true,  name: 'IconBox', component: IconBox },
  { path: '/iconBox/add', exact: true,  name: 'IconBox Add', component: IconBoxDetail },
  { path: '/iconBox/:id', exact: true, name: 'IconBox Details', component: IconBoxDetail },
  { path: '/messages', exact: true,  name: 'Messages', component: Messages },
  { path: '/messages/add', exact: true,  name: 'Message Add', component: MessageDetail },
  { path: '/messages/:id', exact: true, name: 'Message Details', component: MessageDetail },
  { path: '/sections', exact: true,  name: 'Sections', component: Sections },
  { path: '/sections/add', exact: true,  name: 'Section Add', component: SectionDetail },
  { path: '/sections/:id', exact: true, name: 'Section Details', component: SectionDetail },
  { path: '/subscribers', exact: true,  name: 'Subscribers', component: Subscribers },
  { path: '/subscribers/add', exact: true,  name: 'Subscriber Add', component: SubscriberDetail },
  { path: '/subscribers/:id', exact: true, name: 'Subscriber Details', component: SubscriberDetail },
  { path: '/products', exact: true,  name: 'Products', component: Products },
  { path: '/products/add', exact: true,  name: 'Product Add', component: ProductDetail },
  { path: '/products/:id', exact: true, name: 'Product Details', component: ProductDetail },
  { path: '/users', exact: true,  name: 'Users', component: Users },
  { path: '/users/add', exact: true, name: 'User Add', component: UserDetail },
  { path: '/users/:id', exact: true, name: 'User Details', component: UserDetail },
  { path: '/roles', exact: true,  name: 'Roles', component: Roles },
  { path: '/roles/add', exact: true, name: 'Role Add', component: RoleDetail },
  { path: '/roles/:id', exact: true, name: 'Role Details', component: RoleDetail },
  { path: '/socialMedias', exact: true,  name: 'SocialMedias', component: SocialMedias },
  { path: '/socialMedias/add', exact: true, name: 'SocialMedia Add', component: SocialMediaDetail },
  { path: '/socialMedias/:id', exact: true, name: 'SocialMedia Details', component: SocialMediaDetail },
  { path: '/medias', exact: true,  name: 'Medias', component: Medias },
  { path: '/medias/add', exact: true, name: 'Media Add', component: MediaDetail },
  { path: '/medias/:id', exact: true, name: 'Media Details', component: MediaDetail },
  
  { path: '/slider', exact: true,  name: 'Sliders', component: Sliders },
  { path: '/slider/add', exact: true,  name: 'Slider Add', component: SliderDetail },
  { path: '/slider/:id', exact: true, name: 'Slider Details', component: SliderDetail },

  { path: '/companyintroduction', exact: true,  name: 'Company Introduction', component: CompanyIntros},
  { path: '/companyintroduction/add', exact: true,  name: 'Add Company Introduction', component: CompanyIntroDetail},
  { path: '/companyintroduction/:id', exact: true,  name: 'CompanyIntro Edit', component: CompanyIntroDetail},

  { path: '/companyprofile', exact: true,  name: 'Company Profile', component: CProfiles },
  { path: '/companyprofile/add', exact: true,  name: 'Company Profile Add', component: CProfileDetail },
  { path: '/companyprofile/:id', exact: true, name: 'Company Profile Details', component: CProfileDetail },

  { path: '/menus', exact: true,  name: 'Menus', component: Menus },
  { path: '/menus/add', exact: true,  name: 'Menu Add', component: MenuDetail },
  { path: '/menus/:id', exact: true, name: 'Menu Details', component: MenuDetail },
  
  { path: '/blogs', exact: true,  name: 'Blogs', component: Blogs },
  { path: '/blogs/add', exact: true,  name: 'Blog Add', component: BlogDetail },
  { path: '/blogs/:id', exact: true, name: 'Blog Details', component: BlogDetail },
  { path: '/comments', exact: true,  name: 'Comments', component: Comments },
  { path: '/comments/add', exact: true,  name: 'Comment Add', component: CommentDetail },
  { path: '/comments/:id', exact: true, name: 'Comment Details', component: CommentDetail },
];

export default routes;
