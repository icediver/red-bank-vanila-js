import { BaseScreen } from '@/core/component/base-screen/base-screen.component'
import { $R } from '@/core/rquery/rquery.lib'
import renderService from '@/core/services/render.service'

import { Actions } from '@/components/screens/home/actions/actions.component'
import { CardInfo } from '@/components/screens/home/card-info/card-info.component'

import { Button } from '@/components/ui/button/button.component'
import { Field } from '@/components/ui/field/field.component'
import { UserItem } from '@/components/ui/user-item/user-item.component'

import styles from './home.module.scss'
import template from './home.template.html'

export class Home extends BaseScreen {
	constructor() {
		super({ title: 'Home' })
	}
	render() {
		const element = renderService.htmlToElement(
			template,
			[CardInfo, Actions],
			styles
		)
		// $R(element).find('h1').css('color', 'blue')
		return element
	}
}
