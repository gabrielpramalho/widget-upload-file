import * as Collapsible from '@radix-ui/react-collapsible'
import { useState } from 'react'
import { UploadWidgetUploadDropzone } from './upload-widget-dropzone'
import { UploadWidgetHeader } from './upload-widget-header'
import { UploadWidgetUploadList } from './upload-widget-upload-list'
import { UploadWidgetMinimizedButton } from './upload-widget-minimized-button'

export function UploadWidget() {
	const [isWidgetOpen, setIsWidgetOpen] = useState(false)

	return (
		<Collapsible.Root onOpenChange={setIsWidgetOpen} asChild>
			<div className="bg-zinc-900 w-full overflow-hidden max-w-90 rounded-xl shadow-card">
				{!isWidgetOpen && <UploadWidgetMinimizedButton />}

				<Collapsible.Content>
					<UploadWidgetHeader />

					<div className="flex flex-col gap-4 py-3">
						<UploadWidgetUploadDropzone />

						<div className="h-0.5 bg-zinc-800 border-t border-black/50" />

						<UploadWidgetUploadList />
					</div>
				</Collapsible.Content>
			</div>
		</Collapsible.Root>
	)
}
