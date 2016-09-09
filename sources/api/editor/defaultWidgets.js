define( [

    'api/editor/widgets/Angle',
    'api/editor/widgets/Annotation',
    'api/editor/widgets/Axis',
    'api/editor/widgets/Button',
    'api/editor/widgets/Color',
    'api/editor/widgets/FactoredImage',
    'api/editor/widgets/FilePicker',
    'api/editor/widgets/Group',
    'api/editor/widgets/Horizontal',
    'api/editor/widgets/Hyde',
    'api/editor/widgets/Image',
    'api/editor/widgets/Input',
    'api/editor/widgets/Label',
    'api/editor/widgets/NumberedSlider',
    'api/editor/widgets/Number',
    'api/editor/widgets/Orientation',
    'api/editor/widgets/Repeat',
    'api/editor/widgets/Select',
    'api/editor/widgets/SlideredImage',
    'api/editor/widgets/Slider',
    'api/editor/widgets/Tabbed',
    'api/editor/widgets/Textarea',
    'api/editor/widgets/ToggleSwitch',
    'api/editor/widgets/Vertical',
    'api/editor/widgets/Widget'

], function ( AngleWidget, AnnotationWidget, AxisWidget, ButtonWidget, ColorWidget, FactoredImageWidget, FilePickerWidget, GroupWidget, HorizontalWidget, HydeWidget, ImageWidget, InputWidget, LabelWidget, NumberedSliderWidget, NumberWidget, OrientationWidget, RepeatWidget, SelectWidget, SlideredImageWidget, SliderWidget, TabbedWidget, TextareaWidget, ToggleSwitchWidget, VerticalWidget ) {

    'use strict';

    return {

        Group: GroupWidget,
        Tabbed: TabbedWidget,

        Vertical: VerticalWidget,
        Horizontal: HorizontalWidget,

        Hyde: HydeWidget,
        Repeat: RepeatWidget,

        Image: ImageWidget,
        Input: InputWidget,
        Textarea: TextareaWidget,
        Color: ColorWidget,
        FactoredImage: FactoredImageWidget,
        SlideredImage: SlideredImageWidget,
        Number: NumberWidget,
        Select: SelectWidget,
        Slider: SliderWidget,
        NumberedSlider: NumberedSliderWidget,
        Label: LabelWidget,
        ToggleSwitch: ToggleSwitchWidget,
        Button: ButtonWidget,
        FilePicker: FilePickerWidget,
        Annotation: AnnotationWidget,

        Angle: AngleWidget,
        Axis: AxisWidget,
        Orientation: OrientationWidget

    };

} );
