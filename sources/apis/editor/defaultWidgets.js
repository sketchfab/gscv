define( [

    'apis/editor/widgets/Angle',
    'apis/editor/widgets/Axis',
    'apis/editor/widgets/Button',
    'apis/editor/widgets/Color',
    'apis/editor/widgets/FactoredImage',
    'apis/editor/widgets/FilePicker',
    'apis/editor/widgets/Group',
    'apis/editor/widgets/Horizontal',
    'apis/editor/widgets/Hyde',
    'apis/editor/widgets/Image',
    'apis/editor/widgets/Label',
    'apis/editor/widgets/NumberedSlider',
    'apis/editor/widgets/Number',
    'apis/editor/widgets/Orientation',
    'apis/editor/widgets/Select',
    'apis/editor/widgets/SlideredImage',
    'apis/editor/widgets/Slider',
    'apis/editor/widgets/Tabbed',
    'apis/editor/widgets/ToggleSwitch',
    'apis/editor/widgets/Vertical'

], function ( AngleWidget, AxisWidget, ButtonWidget, ColorWidget, FactoredImageWidget, FilePickerWidget, GroupWidget, HorizontalWidget, Hyde, ImageWidget, LabelWidget, NumberedSliderWidget, NumberWidget, OrientationWidget, SelectWidget, SlideredImageWidget, SliderWidget, TabbedWidget, ToggleSwitchWidget, VerticalWidget ) {

    return {

        Group          : GroupWidget,
        Tabbed         : TabbedWidget,

        Vertical       : VerticalWidget,
        Horizontal     : HorizontalWidget,
        Hyde           : Hyde,

        Image          : ImageWidget,
        Color          : ColorWidget,
        FactoredImage  : FactoredImageWidget,
        SlideredImage  : SlideredImageWidget,
        Number         : NumberWidget,
        Select         : SelectWidget,
        Slider         : SliderWidget,
        NumberedSlider : NumberedSliderWidget,
        Label          : LabelWidget,
        ToggleSwitch   : ToggleSwitchWidget,
        Button         : ButtonWidget,
        FilePicker     : FilePickerWidget,

        Angle          : AngleWidget,
        Axis           : AxisWidget,
        Orientation    : OrientationWidget

    };

} );
