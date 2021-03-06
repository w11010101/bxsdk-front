import Vue from 'vue'
// vant ui
import {
    Button,
    NavBar,
    Row,
    Col,
    Divider,
    Field,
    Cell,
    CellGroup,
    Skeleton,
    Switch,
    Uploader,
    DropdownMenu,
    DropdownItem,
    Icon,
    Picker,
    Toast,
    Popup,
    DatetimePicker,
    Search,
    Swipe,
    SwipeItem,
    Lazyload,
    TreeSelect,
    Loading,
    Grid,
    GridItem,
    Image,
    Overlay,
    PullRefresh,
    Dialog,
    IndexBar,
    IndexAnchor,
    SwipeCell,
    RadioGroup,
    Radio,
    List,
    Stepper,
    ImagePreview,
    Progress,
    Collapse,
    CollapseItem,
    Area,
    Checkbox,
    CheckboxGroup,
    Tag,
    Step,
    Steps,
    Calendar,
    Notify,
    Empty,
    Form,
    Slider,
    Card,
    Tab, 
    Tabs
} from 'vant';
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(Card);

Vue.use(Slider);
Vue.use(Form);
Vue.use(Empty);
Vue.use(Notify);
Vue.use(Calendar);
Vue.use(Step);
Vue.use(Steps);
Vue.use(Tag);
Vue.use(Checkbox);
Vue.use(CheckboxGroup);
Vue.use(Area);
Vue.use(Collapse);
Vue.use(CollapseItem);
Vue.use(Progress);
Vue.use(ImagePreview);
Vue.prototype.$ImagePreview = ImagePreview;
Vue.use(Stepper);
Vue.use(List);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(SwipeCell);
Vue.use(IndexBar).use(IndexAnchor);

Vue.use(Dialog);
Vue.use(PullRefresh);
Vue.use(Overlay);
Vue.use(Image);
Vue.use(Grid).use(GridItem);
Vue.use(Loading);
Vue.use(TreeSelect);

Vue.use(Lazyload);
Vue.use(Swipe).use(SwipeItem);
Vue.use(Search);
Vue.use(DatetimePicker);

Vue.use(Button);
Vue.use(NavBar);
Vue.use(Row).use(Col);
Vue.use(Divider);
Vue.use(Field);
Vue.use(Cell).use(CellGroup);
Vue.use(Skeleton);
Vue.use(Switch);
Vue.use(Uploader);
Vue.use(DropdownMenu).use(DropdownItem);
Vue.use(Icon);
Vue.use(Picker);
Vue.use(Toast);
window._Toast = Toast
Vue.use(Popup);