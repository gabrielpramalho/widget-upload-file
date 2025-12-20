import * as Collapsible from '@radix-ui/react-collapsible'
import { motion, useCycle } from 'motion/react'
import { UploadWidgetUploadDropzone } from './upload-widget-dropzone'
import { UploadWidgetHeader } from './upload-widget-header'
import { UploadWidgetMinimizedButton } from './upload-widget-minimized-button'
import { UploadWidgetUploadList } from './upload-widget-upload-list'
import { usePendingUploads } from '../store/uploads'

export function UploadWidget() {
	const { isThereAnyPendingUploads } = usePendingUploads()

	const [isWidgetOpen, toggleWidgetOpen] = useCycle(false, true)

	return (
		<Collapsible.Root onOpenChange={() => toggleWidgetOpen()} asChild>
			<motion.div
				data-progress={isThereAnyPendingUploads}
				className="bg-zinc-900 max-w-90 overflow-hidden rounded-xl data-[state=open]:shadow-card border border-transparent animate-border data-[state=closed]:rounded-3xl data-[state=closed]:data-[progress=false]:shadow-card data-[state=closed]:data-[progress=true]:[background:linear-gradient(45deg,#09090B,--theme(--color-zinc-900)_50%,#09090B)_padding-box,conic-gradient(from_var(--border-angle),--theme(--color-zinc-700/.48)_80%,--theme(--color-lime-500)_86%,--theme(--color-lime-300)_90%,--theme(--color-lime-500)_94%,--theme(--color-zinc-600/.48))_border-box]"
				animate={isWidgetOpen ? 'open' : 'closed'}
				variants={{
					closed: {
						width: 'max-content',
						height: 44,
						transition: {
							type: 'keyframes',
							duration: 0.05,
						},
					},
					open: {
						width: 360,
						height: 'auto',
						transition: {
							duration: 0.15,
						},
					},
				}}
			>
				{!isWidgetOpen && <UploadWidgetMinimizedButton />}

				<Collapsible.Content>
					<UploadWidgetHeader />

					<div className="flex flex-col gap-4 py-3">
						<UploadWidgetUploadDropzone />

						<div className="h-0.5 bg-zinc-800 border-t border-black/50" />

						<UploadWidgetUploadList />
					</div>
				</Collapsible.Content>
			</motion.div>
		</Collapsible.Root>
	)
}
