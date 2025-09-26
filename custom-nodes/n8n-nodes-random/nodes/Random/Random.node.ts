import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	IHttpRequestOptions,
	NodeOperationError
} from 'n8n-workflow';

export class Random implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Random',
		name: 'random',
		icon: 'file:random.svg',
		group: ['transform'],
		version: 1,
		description: 'Gera um número aleatório verdadeiro (True Random) usando a API do Random.org',
		defaults: {
			name: 'Random Number',
		},
		inputs: ['main'],
		outputs: ['main'],
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Integer',
						value: 'integer',
					},
				],
				default: 'integer',
				required: true,
				description: 'O tipo de número aleatório a ser gerado',
			},

			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['integer'],
					},
				},
				options: [
					{
						name: 'Generate',
						value: 'generate',
						description: 'Gera um número aleatório',
						action: 'Generate a random number',
					},
				],
				default: 'generate',
			},

			{
				displayName: 'Min',
				name: 'minValue',
				type: 'number',
				required: true,
				displayOptions: {
					show: {
						resource: ['integer'],
						operation: ['generate'],
					},
				},
				default: 1,
				description: 'O valor mínimo para o número aleatório (inclusivo)',
			},
			{
				displayName: 'Max',
				name: 'maxValue',
				type: 'number',
				required: true,
				displayOptions: {
					show: {
						resource: ['integer'],
						operation: ['generate'],
					},
				},
				default: 100,
				description: 'O valor máximo para o número aleatório (inclusivo)',
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		for (let i = 0; i < items.length; i++) {
			try {
				const minValue = this.getNodeParameter('minValue', i, 1) as number;
				const maxValue = this.getNodeParameter('maxValue', i, 100) as number;

				if (minValue > maxValue) {
					throw new NodeOperationError(this.getNode(), 'O valor mínimo não pode ser maior que o valor máximo.', { itemIndex: i });
				}

				const options: IHttpRequestOptions = {
					method: 'GET',
					url: `https://www.random.org/integers/?num=1&min=${minValue}&max=${maxValue}&col=1&base=10&format=plain&rnd=new`,
					json: false,
				};

				const response = await this.helpers.httpRequest(options);
				const randomNumber = parseInt(response as string, 10);

				const newItem: INodeExecutionData = {
					json: {
						...items[i].json,
						randomNumber: randomNumber,
					},
					binary: items[i].binary,
				};

				returnData.push(newItem);
			} catch (error) {
				if (this.continueOnFail()) {
					const errorMessage = error instanceof Error ? error.message : JSON.stringify(error);
					returnData.push({ json: { error: errorMessage }, pairedItem: i });
					continue;
				}
				throw error;
			}
		}

		return this.prepareOutputData(returnData);
	}
}
