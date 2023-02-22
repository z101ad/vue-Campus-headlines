import Vue from "vue";
import {
  NavBar,
  Form,
  Field,
  Button,
  Toast,
  Tabbar,
  TabbarItem,
  Image as VanImage,
  Grid,
  GridItem,
  Cell,
  CellGroup,
  Uploader,
  Dialog,
  Popup,
  DatetimePicker,
  Tab,
  Tabs,
  Icon,
  List,
  PullRefresh,
  Divider,
  ActionSheet,
  Search,
  Tag,
} from "vant";

// 这是login用到的vant
Vue.use(NavBar);
Vue.use(Form);
Vue.use(Field);
Vue.use(Button);
Vue.use(Toast);
// 这是mine用到的vant
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(VanImage);
Vue.use(Grid);
Vue.use(GridItem);

Vue.use(Cell);
Vue.use(CellGroup);

Vue.use(Uploader);

// 全局注册
Vue.use(Dialog);

Vue.use(Popup);

Vue.use(DatetimePicker);

Vue.use(Icon);
Vue.use(Tab);
Vue.use(Tabs);

Vue.use(List);

Vue.use(PullRefresh);

Vue.use(Divider);

Vue.use(ActionSheet);

Vue.use(Search);
Vue.use(Tag);
