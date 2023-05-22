import ChildComponent from '@/core/component/child.component'
import { $R } from '@/core/rquery/rquery.lib'
import renderService from '@/core/services/render.service'
import { Store } from '@/core/store/store'

import {
	TRANSFER_FIELD_SELECTOR,
	TransferField
} from '@/components/screens/home/contacts/transfer-field/transfer-field.component'

import { Heading } from '@/components/ui/heading/heading.component'
import {
	LOADER_SELECTOR,
	Loader
} from '@/components/ui/loader/loader.component'
import { UserItem } from '@/components/ui/user-item/user-item.component'

import { UserService } from '@/api/user.service'

import styles from './contacts.module.scss'
import template from './contacts.template.html'

import { formatCardNumberWithDashes } from '@/utils/format/format-card-number'

export class Contacts extends ChildComponent {
	constructor() {
		super()

		this.store = Store.getInstance().state
		this.userService = new UserService()
	}

	fetchData() {
		this.userService.getAll(null, data => {
			if (!data) return

			this.element.querySelector(LOADER_SELECTOR).remove()
			for (const user of data) {
				$R(this.element)
					.find('#contacts-list')
					.append(
						new UserItem(user, true, () => {
							$R(TRANSFER_FIELD_SELECTOR).value(
								formatCardNumberWithDashes(user.card.number)
							)
						}).render()
					)
			}
			$R(this.element)
				.find('#contacts-list')
				.findAll('button')
				.forEach(contactsElement => {
					contactsElement.addClass('fade-in')
				})
		})
	}
	render() {
		this.element = renderService.htmlToElement(
			template,
			[TransferField, new Heading('Transfer money')],
			styles
		)
		if (this.store.user) {
			$R(this.element)
				.find('#contacts-list')
				.html(new Loader().render().outerHTML)

			setTimeout(() => this.fetchData(), 500)
		}
		return this.element
	}
}
