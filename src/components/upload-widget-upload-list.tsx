import { UploadWidgetUploadItem } from './upload-widget-upload-item'

export function UploadWidgetUploadList() {
	const isUploadListEmpty = false

	return (
		<div className="px-3 flex flex-col gap-3">
			<span className="text-xs font-medium">
				Uploaded files <span>(2)</span>
			</span>

			{isUploadListEmpty ? (
				<div>
					<span className='text-xs text-zinc-400'>No uploads added</span>
				</div>
			) : (
				<div className="space-y-2">
					<UploadWidgetUploadItem />
					<UploadWidgetUploadItem />
					<UploadWidgetUploadItem />
				</div>
			)}
		</div>
	)
}
