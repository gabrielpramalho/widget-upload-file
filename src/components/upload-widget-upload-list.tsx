import { AnimatePresence, motion } from 'motion/react'
import { useUploads } from '../store/uploads'
import { UploadWidgetUploadItem } from './upload-widget-upload-item'

export function UploadWidgetUploadList() {
	const uploads = useUploads((store) => store.uploads)
	const isUploadListEmpty = uploads.size === 0

	const listVariants = {
		hidden: { opacity: 1 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.1, // Tempo entre cada item aparecendo
			},
		},
	}

	const itemVariants = {
		hidden: { opacity: 0, y: 10, filter: 'blur(4px)' },
		visible: {
			opacity: 1,
			y: 0,
			filter: 'blur(0)',
			transition: { duration: 0.1 },
		},
	}
	return (
		<div className="px-3 flex flex-col gap-3">
			<span className="text-xs font-medium">
				Uploaded files <span>({uploads.size})</span>
			</span>

			{isUploadListEmpty ? (
				<div>
					<span className="text-xs text-zinc-400">No uploads added</span>
				</div>
			) : (
				<AnimatePresence>
					<motion.div
						variants={listVariants}
						initial="hidden"
						animate="visible"
						className="space-y-2"
					>
						{Array.from(uploads.entries()).map(([uploadId, upload]) => {
							return (
								<motion.div key={uploadId} variants={itemVariants} layout>
									<UploadWidgetUploadItem key={uploadId} upload={upload} />
								</motion.div>
							)
						})}
					</motion.div>
				</AnimatePresence>
			)}
		</div>
	)
}
