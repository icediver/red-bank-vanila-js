import { redQuery } from '@/core/red-query/red-query.lib'

export class UserService {
	#BASE_URL = '/users'

	getAll(searchTerm, onSuccess) {
		console.log(
			`${this.#BASE_URL}${
				searchTerm
					? `${new URLSearchParams({
							searchTerm
					  })}`
					: ''
			}`
		)
		return redQuery({
			path: `${this.#BASE_URL}${
				searchTerm
					? `?${new URLSearchParams({
							searchTerm
					  })}`
					: ''
			}`,
			onSuccess
		})
	}
}
