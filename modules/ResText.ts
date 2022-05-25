import Color from '../utils/Color';
import Point from '../utils/Point';
import Size from '../utils/Size';
import Text from './Text';
import { Screen } from '../utils/Screen';
import TextHelper from '../utils/TextHelper';

export enum Alignment {
	Left,
	Centered,
	Right
}

export default class ResText extends Text {
	public TextAlignment: Alignment = Alignment.Left;
	public DropShadow: boolean | undefined;
	public Outline: boolean | undefined;
	public Wrap: number = 0;
	public get WordWrap() {
		return new Size(this.Wrap, 0);
	}
	public set WordWrap(value) {
		this.Wrap = value.Width;
	}

	constructor(caption: any, pos: any, scale: any, color?: any, font?: any, justify?: any) {
		super(
			caption,
			pos,
			scale,
			color || new Color(255, 255, 255),
			font || 0,
			false
		);
		if (justify) this.TextAlignment = justify;
	}

	public Draw(): void;
	public Draw(offset: Size): void;
	public Draw(caption: any, pos: any, scale: any, color: any, font: any, arg2: any): void;

	Draw(
		arg1?: any,
		pos?: any,
		scale?: any,
		color?: any,
		font?: any,
		arg2?: any,
		dropShadow?: any,
		outline?: any,
		wordWrap?: any
	) {
		let caption = arg1;
		let centered = arg2;
		let textAlignment = arg2;
		if (!arg1) arg1 = new Size(0, 0);
		if (arg1 && !pos) {
			textAlignment = this.TextAlignment;
			caption = this.caption;
			pos = new Point(this.pos.X + arg1.Width, this.pos.Y + arg1.Height);
			scale = this.scale;
			color = this.color;
			font = this.font;
			if (centered == true || centered == false) {
				centered = this.centered;
			} else {
				centered = undefined;
				dropShadow = this.DropShadow;
				outline = this.Outline;
				wordWrap = this.WordWrap;
			}
		}

		const screenw = Screen.width;
		const screenh = Screen.height;

		const height = 1080.0;
		const ratio = screenw / screenh;
		const width = height * ratio;

		const x = this.pos.X / width;
		const y = this.pos.Y / height;

		mp.game.ui.setTextFont(parseInt(font));
		mp.game.ui.setTextScale(1.0, scale);
		mp.game.ui.setTextColour(color.R, color.G, color.B, color.A);

		if (centered !== undefined) {
			mp.game.ui.setTextCentre(centered);
		} else {
			if (dropShadow) mp.game.ui.setTextDropshadow(2, 0, 0, 0, 0);

			if (outline) console.warn('outline not working!');

			switch (textAlignment) {
				case Alignment.Centered:
					mp.game.ui.setTextCentre(true);
					break;
				case Alignment.Right:
					mp.game.ui.setTextRightJustify(true);
					mp.game.ui.setTextWrap(0.0, x);
					break;
			}

			if (this.Wrap) {
				const xsize = (this.pos.X + this.Wrap) / width;
				mp.game.ui.setTextWrap(x, xsize);
			}
		}

		mp.game.ui.setTextEntry('CELL_EMAIL_BCON'); // THREESTRINGS
		TextHelper.AddLongString(caption);
		mp.game.ui.drawText(x, y, 0);
	}
}