<div className="grid grid-cols-1 lg:grid-cols-4 gap-2 px-5 py-2">
          <FontFamily name="font" />
          <Range title="Font Size" name="fontSize" min={14} max={100} />
          <FontWeight name="fontWeight" />
          <FontStyle name="fontStyle" />
          <TextDecoration name="textDecoration" />
          <TextTransform name="textTransform" />
          <Alignment name="alignment" />
          <Color title="Text" name="color" />
          <InputGroup name="padding" title="Padding" min={0} max={50} />
          <InputGroup name="margin" title="Margin" min={0} max={50} />
          <Border name="border" min={0} max={20} />
          <Range
            title="Letter Spacing"
            name="letterSpacing"
            min={-5}
            max={50}
          />
          <Range title="Word Spacing" name="wordSpacing" min={-5} max={50} />
          <Range title="Line Height" name="lineHeight" min={0} max={100} />

          <Color title="Background" name="bgColor" />
          <Range title="Border Radius" name="borderRadius" min={0} max={50} />
          <Toggle title="Show Section" name="showSection" />
        </div>