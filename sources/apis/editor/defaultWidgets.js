define( [

    'apis/editor/widgets/Angle',
    'apis/editor/widgets/Annotation',
    'apis/editor/widgets/Axis',
    'apis/editor/widgets/Background',
    'apis/editor/widgets/BackgroundUploader',
    'apis/editor/widgets/Button',
    'apis/editor/widgets/Color',
    'apis/editor/widgets/ColorPicker',
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
    'apis/editor/widgets/Repeat',
    'apis/editor/widgets/Select',
    'apis/editor/widgets/SlideredImage',
    'apis/editor/widgets/Slider',
    'apis/editor/widgets/Tabbed',
    'apis/editor/widgets/ToggleSwitch',
    'apis/editor/widgets/Vertical',
    'apis/editor/widgets/Widget'

], function ( AngleWidget, AnnotationWidget, AxisWidget, BackgroundWidget, BackgroundUploaderWidget, ButtonWidget, ColorWidget, ColorPickerWidget, FactoredImageWidget, FilePickerWidget, GroupWidget, HorizontalWidget, Hyde, ImageWidget, LabelWidget, NumberedSliderWidget, NumberWidget, OrientationWidget, RepeatWidget, SelectWidget, SlideredImageWidget, SliderWidget, TabbedWidget, ToggleSwitchWidget, VerticalWidget ) {

    'use strict';

    return {

        Group: GroupWidget,
        Tabbed: TabbedWidget,

        Vertical: VerticalWidget,
        Horizontal: HorizontalWidget,

        Hyde: Hyde,
        Repeat: RepeatWidget,

        Image: ImageWidget,
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

        Background: BackgroundWidget,
        BackgroundUploader: BackgroundUploaderWidget,
        ColorPicker: ColorPickerWidget,

        Angle: AngleWidget,
        Axis: AxisWidget,
        Orientation: OrientationWidget

    };

} );
